export interface IName {
  first: string;
  last: string;
}

export interface PhonesInterface {
  id: string;
  isActive: boolean;
  age: number;
  name: IName;
  company: string;
  email: string;
  phone: string;
  address: string;
  registered: Date;
}
