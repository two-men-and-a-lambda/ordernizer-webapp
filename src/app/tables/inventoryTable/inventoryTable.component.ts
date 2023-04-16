import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ProductInventory, ProductInventoryColumns } from '../models/ProductInventory'
import { WholeSaleService } from '../services/wholesale.service'
import { YourDialogComponent } from '../../your.dialog.component'
import { MatSortModule } from '@angular/material/sort';



@Component({
  selector: 'inventoryTable',
  templateUrl: './inventoryTable.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class InventoryTableComponent {
  displayedColumns: string[] = ProductInventoryColumns.map((col) => col.key)
  columnsSchema: any = ProductInventoryColumns
  dataSource = new MatTableDataSource<ProductInventory>()
  valid: any = {}
  editStock: boolean = false
  editPending: boolean = false
  editShipment: boolean = false
  editSale: boolean = false

  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) { }

  ngOnInit() {
    this.wholeSaleService.getTotals().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  submitInventory() {
    this.editStock = !this.editStock
    this.wholeSaleService.postInventory(this.dataSource.data).subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  isNewSales(): boolean {
    for (let row of this.dataSource.data) {
      if (row.isSaleSelected) {
        return true
      }
    };
    return false
  }

  isNewShipments(): boolean {

    for (let row of this.dataSource.data) {
      if (row.isShipmentSelected) {
        return true
      }
    };
    return false
  }

  enterSale(row: ProductInventory, quantity: number, price: number, date: string){
    row.isSaleSelected = !row.isSaleSelected
    row.sale= quantity + " x$" + price + " @" + date
  }


  submitShipment() {
    this.editShipment = !this.editShipment
    this.dataSource.data.forEach(function (row) {
      console.log(row['shipment'])
    });
  }
  submitSale() {
    this.editSale = !this.editSale
    this.wholeSaleService.postSale(this.dataSource.data).subscribe((res: any) => {
      this.dataSource.data = res
    })
    const dialogRef = this.dialog.open(YourDialogComponent);

    /* 
      Handles what happens after the modal dialog is closed
    */
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('nice');
      }
    });
  }

  editRow(row: ProductInventory) {
    if (row.wholesaleId === 0) {
      console.log('add row')
    }
    else {
      console.log('edit row')
    }
  }



  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}