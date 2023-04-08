export interface ProductInventory {
  businessId: number;
  wholesaleId: number;
  product: string;
  units_remaining: number;
  pending: number;
  orderdate: string;
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
  
];
