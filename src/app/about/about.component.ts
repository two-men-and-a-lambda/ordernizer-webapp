import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { Table, TableColumns } from '../tables/models/table'
import { WholeSaleService } from '../tables/services/wholesale.service'
import { YourDialogComponent } from '../your.dialog.component'


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['../app.component.scss'],
})
export class AboutComponent {
    displayedColumns: string[] = TableColumns.map((col) => col.key)
  columnsSchema: any = TableColumns
  dataSource = new MatTableDataSource<Table>()
  valid: any = {}
  table_name: string = 'retail_input'

  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) {}

  ngOnInit() {
    this.wholeSaleService.getTable('retail_input').subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource.data);
    })
  }
  getTable(table: string) {
    this.wholeSaleService.getTable(table).subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource.data);
      this.table_name = table;
  })
}
}