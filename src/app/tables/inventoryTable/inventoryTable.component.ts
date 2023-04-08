import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ProductInventory, ProductInventoryColumns } from '../models/ProductInventory'
import { WholeSaleService } from '../services/wholesale.service'


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

  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) {}

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

  submitPending() {
    this.editPending = !this.editPending
    this.dataSource.data.forEach(function (row) {
      console.log(row['pending'])
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
    /**const newRow: ProductInventory = {
      isSelected: false,
      businessID: -1
      
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]**/
  }

  removeRow(id: number) {
    console.log('remove row')
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