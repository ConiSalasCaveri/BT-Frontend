import { PetitionType } from './petition-petition-type.model';
import { Payment } from '../../../shared/models/petition/petition-payment.model';
import { PetitionProductModel } from './petition-product.model';

export class PetitionModel {

  constructor(init?: Partial<PetitionModel>) {
    Object.assign(this, init);
  }
  id: string;
  user: string;
  name: string;
  outercode: number;
  offerExpirationDate: Date;
  awardedDate: Date;
  deliveryDate: Date;
  state: number;
  street: string;
  streetNumber: number;
  apartment: string;
  postCode: string;
  provinceId: number;
  provinceName: string;
  localityId: number;
  localityName: string;
  deliveryOnSiteDateStart: Date;
  deliveryOnSiteDateEnd: Date;
  categories: string[];
  subcategories: string[];
  type: PetitionType;
  payment: Payment;
  products: PetitionProductModel[];
}
