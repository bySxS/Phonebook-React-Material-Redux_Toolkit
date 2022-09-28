export interface IName {
  first: string;
  last: string;
}

export interface IContacts {
  id: string;
  isActive: boolean;
  age: number;
  name: IName;
  company?: string;
  email?: string;
  phone: string;
  address?: string;
  registered: Date;
}

export interface IContactForm {
  id: string;
  isActive: boolean;
  age: number;
  firstName: string;
  lastName: string;
  company?: string;
  email?: string;
  phone: string;
  address?: string;
  registered: Date;
}
