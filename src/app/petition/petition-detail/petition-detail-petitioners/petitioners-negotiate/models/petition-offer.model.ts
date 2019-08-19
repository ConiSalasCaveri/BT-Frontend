import { Payment } from 'src/app/shared/models/petition/petition-payment.model';
import { Roles } from './roles.model';
import { PetitionOfferType } from './petition-offer-type.model';

export class PetitionOfferModel {
  constructor() {}

  id: string;
  name: string;
  place: number;
  tripleA: boolean;
  starRate: number;
  payment: Payment;
  paymentPeriod: number;
  shippingCost: number;
  shippingCostOwner: Roles;
  total: number;
  subtotal: number;
  updatedOn: Date;
  deliveryOnSiteDateStart: Date;
  type: PetitionOfferType
}

