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

  todayDate = new Date()

  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) { }

  ngOnInit() {
    this.wholeSaleService.getTotals().subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource)
    })
  }

  submitInventory() {
    this.editStock = !this.editStock
    this.wholeSaleService.postInventory(this.dataSource.data).subscribe((res: any) => {
      for (let row of this.dataSource.data) {
        for (let key in res){
          if (row.product === key){
            row.units_remaining = res[key]
          }
        }
      }

      
    })
  }

  isNewSales(): boolean {
    for (let row of this.dataSource.data) {
      if (row.saleQuantity && !row.isSaleSelected) {
        return true
      }
    };
    return false
  }


  isNewShipments(): boolean {

    for (let row of this.dataSource.data) {
      if (row.shipmentQuantity && !row.isShipmentSelected) {
        return true
      }
    };
    return false
  }
  editAllShipment(){
    for (let row of this.dataSource.data) {
      row.isShipmentSelected = true
    }
  }
  editAllSale(){
    for (let row of this.dataSource.data) {
      row.isSaleSelected = true
    }
  }

  enterSale(row: ProductInventory){
    row.isSaleSelected = !row.isSaleSelected
    /*row.sale= quantity + " x$" + price + " @" + date*/
  }

  enterShipment(row: ProductInventory){
    row.isShipmentSelected = !row.isShipmentSelected
    /*row.sale= quantity + " x$" + price + " @" + date*/
  }

  dateString(d: Date){
    var month = d.getUTCMonth() + 1; //months from 1-12
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();

    return month + "/" + day + "/" + year;
  }

  submitShipment() {
    this.editShipment = !this.editShipment
    this.wholeSaleService.postShipment(this.dataSource.data).subscribe((res: any) => {
      for (let row of this.dataSource.data) {
        for (let key in res){
          if (row.product === key){
            row.units_remaining = res[key]
            row.isShipmentSelected = false
            row.shipmentDate = null as any
            row.shipmentPrice = null as any
            row.shipmentQuantity = null as any

          }
        }
      }
    })
  }
  submitSale() {
    this.wholeSaleService.postSale(this.dataSource.data).subscribe((res: any) => {
      for (let row of this.dataSource.data) {
        for (let key in res){
          if (row.product === key){
            row.units_remaining = res[key]
            row.isSaleSelected = false
            row.saleDate = null as any
            row.salePrice = null as any
            row.saleQuantity = null as any

          }
        }
      }
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