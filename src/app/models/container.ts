export interface Container {
  serialNumber: string;
  productCode: string;
  size: number;
  containerType: string;
  condition: 'NEW' | 'IICL' | 'CW' | 'WWT' | 'AS IS' | 'SCRAP';
  isoCode?: string;
  status: 'Available' | 'Purchase in progress' | 'In transit' | 'Damaged' | 'Reserved';
  yom?: number;
  customsStatus?: 'Yes' | 'No' | 'In process';
  ral?: string;
  purchaseValue: number;
  currentValue: number;
  vendor?: string;
  owner: string;
  entryDate: Date;
  currentLocation: string;
  entryDateCurrentLocation: Date;
  attachedDocuments?: string[];
}
