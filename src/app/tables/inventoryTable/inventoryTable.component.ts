import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ProductInventory, ProductInventoryColumns } from '../models/ProductInventory'
import { WholeSaleService } from '../services/wholesale.service'
import { YourDialogComponent } from '../../your.dialog.component'


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
  editShipment: boolean = false
  editSale: boolean = false
  editing: boolean = false

  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) {}

  ngOnInit() {
    this.getTotals();
  }
  getTotals() {
    this.wholeSaleService.getTotals().subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource.data);
    })
  }

  submitInventory() {
    this.editStock = !this.editStock
    this.wholeSaleService.postInventory(this.dataSource.data).subscribe((res: any) => {
      this.dataSource.data = res
    })
  }
  submitShipment() {
    this.editShipment = !this.editShipment
    this.wholeSaleService.postShipment(this.dataSource.data).subscribe((res: any) => {
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
      console.log('oh');
      this.getTotals();
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

  addRow() {
    let new_F_Date: Date = new Date();
    // Converting date to string
    let result: string = new_F_Date.toLocaleString();
    const newRow: ProductInventory = {
      businessId: 0,
      wholesaleId: 0,
      product: 'blah',
      units_remaining: 0,
      orderdate: 'ahh',
      shipment: 'ah',
      sale: 0,
      secondary: 0,
      ship_secondary: 0,
      prod_secondary: true
    }
    this.editing = true;
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    console.log('remove row')
  }
  cancel() {
    this.editShipment = !this.editShipment;
    this.editing = !this.editing;
    this.dataSource.data = this.dataSource.data.slice(1);
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