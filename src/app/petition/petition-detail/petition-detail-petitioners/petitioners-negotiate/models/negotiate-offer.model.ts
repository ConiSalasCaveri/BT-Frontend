import { Roles } from './roles.model';
import { Payment } from 'src/app/shared/models/petition/petition-payment.model';

export class NegotiateOfferModel {
  constructor(offerModel: NegotiateOfferModel) {
    this.payment = offerModel.payment,
    this.paymentPeriod = offerModel.paymentPeriod,
    this.shippingCostOwner = offerModel.shippingCostOwner,
    this.deliveryOnSiteDateStart = offerModel.deliveryOnSiteDateStart,
    this.priceImprovement = offerModel.priceImprovement
  }
  payment: Payment;
  paymentPeriod: number;
  shippingCostOwner: Roles;
  deliveryOnSiteDateStart: Date;
  priceImprovement: boolean;
}
