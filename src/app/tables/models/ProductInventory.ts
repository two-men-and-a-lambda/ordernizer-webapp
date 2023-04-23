export interface ProductInventory {
  productID: number;
  wholesaleId: number;
  product: string;
  units_remaining: number;
  orderdate: string;

  isShipmentSelected: boolean;
  shipmentQuantity: number;
  shipmentPrice: number;
  shipmentDate: Date;


  isSaleSelected: boolean;
  saleQuantity : number;
  salePrice : number;
  saleDate : Date;

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
