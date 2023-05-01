import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MetricsService } from 'src/app/tables/services/metrics.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private metricService: MetricsService) {}

  salesResponse: any = null as any

  salesData: any[] = null as any
  revenueData: any[] = null as any
  salesTotals: any = null as any
  revenueTotals: any = null as any

  lookback: string = '1W'
  lookbackUnits: string = '1D'



  ngOnInit() {
    this.metricService.getSalesChartData(this.lookback, this.lookbackUnits).subscribe((res: any) => {
      this.salesResponse = res
      this.salesData = res.salesData
      this.revenueData = res.revenueData
      this.salesTotals = this.formatTotals(res.salesTotals)
      this.revenueTotals = this.formatTotals(res.revenueTotals)

    })
  }

  formatTotals(totalsJson: any){
    let res: any[] = []
    for (let product in totalsJson){
      let productDict = {'name':product, 'value':totalsJson[product]}
      res.push(productDict)
    }
    return res
  }

  refreshTable(lookback: string, unit: string){
    this.metricService.getSalesChartData(lookback, unit).subscribe((res: any) => {
      this.salesResponse = res
      this.salesData = res.salesData
      this.revenueData = res.revenueData
      this.salesTotals = this.formatTotals(res.salesTotals)
      this.revenueTotals = this.formatTotals(res.revenueTotals)
    })
  }
}
