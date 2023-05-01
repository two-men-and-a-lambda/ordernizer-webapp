import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { Table, TableColumns } from '../tables/models/table'
import { WholeSaleService } from '../tables/services/wholesale.service'
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs'; 
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select'





@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AboutComponent {
    displayedColumns: string[] = TableColumns.map((col) => col.key)
  columnsSchema: any = TableColumns

  dataSource = new MatTableDataSource<Table>()
  origData: Table[] = []

  valid: any = {}
  table_name: string = 'wholesale'

  fcont = new FormControl()
  filterHack = false


  selectedProducts: string[] = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.wholeSaleService.getTable('wholesale').subscribe((res: any) => {
      this.dataSource.data = res
      this.origData = res

      console.log(this.dataSource.data);
    })
    this.selectedProducts = Array.from(this.returnListAllProducts().values())
    this.fcont = new FormControl(Array.from(this.returnListAllProducts().values()))
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
  }

  tabClick(tab: MatTabChangeEvent){
    switch(tab.index) { 
      case 1: { 
        this.getTable('retail')
         break; 
      } 

      default: { 
        this.getTable('wholesale')
 
         break; 
      } 
   } 
  }
  getTable(table: string) {
    this.wholeSaleService.getTable(table).subscribe((res: any) => {
      this.dataSource.data = res
      this.origData = res
      console.log(this.dataSource.data);
      this.table_name = table;
  })
}

  returnListAllProducts(): Set<string>{
    let products = new Set<string>();
    for (let row of this.origData){
      products.add(row.product)
    }
    return products
  }


  filterTable(){
    if (!this.filterHack){
      this.selectedProducts=Array.from(this.returnListAllProducts().values())
    this.filterHack = true
    }
    console.log('boner')
    console.log(this.fcont.getRawValue())
    let filteredData = this.origData.filter(
      
      (row) => {
        console.log(this.selectedProducts)
        console.log(row.product)
         return this.selectedProducts.includes(row.product);
        }
    );

    this.dataSource.data = filteredData

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}