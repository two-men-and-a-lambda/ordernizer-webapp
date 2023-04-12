export interface Table {
    id: number, 
    product: string,
    price: number,
    units: number,
    timestamp: string
  }
  
  export const TableColumns = [
    {
      key: 'product',
      type: 'number',
      label: 'Product',
      required: true,
  
    },
    {
      key: 'price',
      type: 'number',
      label: 'Price',
      required: true,
      width: 60
    },
    {
      key: 'units',
      type: 'number',
      label: 'Units',
      required: true,
      width: 60
    },
    {
      key: 'timestamp',
      type: 'string',
      label: 'Timestamp',
      required: true,
      width: 60
    }
    
  ];
  