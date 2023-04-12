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

  constructor(public dialog: MatDialog, private wholeSaleService: WholeSaleService) {}

  ngOnInit() {
    this.wholeSaleService.getTable().subscribe((res: any) => {
      this.dataSource.data = res
      console.log(this.dataSource.data);
    })
  }
}