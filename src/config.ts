import { ICollectionType, IConfig } from './lib/app/types';

const CONFIG: IConfig = {
  coinDenom: 'ustars',
  name: 'Embeddable House',
  chainId: 'elgafar-1',
  createdDate: '2024-03-31T19:01:01.148Z',
  modifiedDate: '2024-03-31T19:01:01.148Z',
  id: 'andromeda',
  collections: [
    {
      auction: 'andr1k4lerhf643vtus2qrv94v3uge673jg0xpeyr2srykll9ajjmplxsy5actc',
      cw721: 'andr1crlwwmk0yple0rkd0mcgunpzgmwln78aqwq2jzgj972nsx775fsqyauqsd',
      name: 'NftSales',
      type: ICollectionType.AUCTION,
      id: 'embeddables-auction-1',
      featured: 'ANDR1',
    },
  ],
};

export default CONFIG;
