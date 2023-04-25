import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MetricsService } from '../tables/services/metrics.service';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  constructor( private metricService: MetricsService) { }


  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Units Sold';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnInit() {
    this.metricService.getSalesChartData('1W', '1D').subscribe((res: any) => {
      this.tableData = res.salesData
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  tableData: any[] = [
    {
      "name": "Apples",
      "series": [
        
        {
          "value": 1,
          "name": "Tuesday"
        },
        
        {
          "value": 8,
          "name": "Thursday"
        },
        {
          "value": 12,
          "name": "Friday"
        },
        {
          "value": 12,
          "name": "Saturday"
        },
        {
          "value": 4,
          "name": "Sunday"
        },
        {
          "value": 12,
          "name": "Monday"
        }
      ]
    },
    {
      "name": "Bananas",
      "series": [
        
        {
          "value": 1,
          "name": "Tuesday"
        },
        {
          "value": 24,
          "name": "Wednesday"
        },
        
        
        
        
        
      ]
    }
      
  ]

}
