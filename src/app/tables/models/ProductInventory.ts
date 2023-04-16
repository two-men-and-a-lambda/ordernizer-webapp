export interface ProductInventory {
  businessId: number;
  wholesaleId: number;
  product: string;
  units_remaining: number;
  orderdate: string;
  shipment: string;
  sale: string;
  isShipmentSelected: boolean;
  isSaleSelected: boolean;
  secondary: number;
  lastSoldPrice: number;
  
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
  },
  {
    key: 'isShipmentSelected',
    type: 'number',
    label: '',
    required: true,
  },
  {
    key: 'isSaleSelected',
    quantity: '',
    price: '',
    date: '',
    type: 'number',
    label: '',
    required: true,
  },

  
];
