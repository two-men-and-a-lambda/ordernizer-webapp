export interface ProductInventory {
  businessId: number;
  wholesaleId: number;
  product: string;
  units_remaining: number;
  orderdate: string;
  shipment: string;
  sale: number;
  secondary: number
  ship_secondary: number
  prod_secondary: Boolean
}

export const ProductInventoryColumns = [
  {
    key: 'product',
    prod_secondary: 'prod_secondary',
    type: 'string',
    label: 'Product',
    required: true,

  },
  {
    key: 'units_remaining',
    type: 'number',
    label: 'In Stock',
    required: true,
    width: 60
  },
  {
    key: 'shipment',
    ship_secondary: 'ship_secondary',
    type: 'number',
    label: 'Shipment',
    required: true,
    width: 60
  },
  {
    key: 'sale',
    secondary: 'secondary',
    type: 'number',
    label: 'Sale',
    required: true,
    width: 60
  }
  
];
