export interface SalesChartData {
  product: string
  series: SalesPoint[]
  salesTotal: number
  lookbackDate: Date
  currentDate: Date
  periodUnit: String   
}

interface SalesPoint{
  product: string
  value: number
  name: string
}
