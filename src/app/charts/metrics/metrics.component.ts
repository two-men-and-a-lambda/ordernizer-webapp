import { Component } from '@angular/core';
import { MetricsService } from 'src/app/tables/services/metrics.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {

  constructor( private metricService: MetricsService) { }

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
