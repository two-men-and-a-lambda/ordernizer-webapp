export interface ProductInventory {
  businessId: number;
  wholesaleId: number;
  product: string;
  units_remaining: number;
  pending: number;
  orderdate: string;
  shipment: string;
  sale: string
  secondary: number
}

export const ProductInventoryColumns = [
  {
    key: 'product',
    type: 'number',
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
    key: 'pending',
    type: 'number',
    label: 'Pending',
    required: true,
    width: 60
  },
  {
    key: 'shipment',
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
