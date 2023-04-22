import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { Table, TableColumns } from '../tables/models/table'
import { WholeSaleService } from '../tables/services/wholesale.service'
import { YourDialogComponent } from '../your.dialog.component'
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs'; 



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
  valid: any = {}
  table_name: string = 'retail_input'


  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) {}

  ngOnInit() {
    this.wholeSaleService.getTable('wholesale').subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource.data);
    })
  }
  tabClick(tab: MatTabChangeEvent){
    switch(tab.index) { 
      case 1: { 
        this.getTable('wholesale')
         break; 
      } 

      default: { 
        this.getTable('retail_input')
 
         break; 
      } 
   } 
  }
  getTable(table: string) {
    this.wholeSaleService.getTable(table).subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource.data);
      this.table_name = table;
  })
}
}