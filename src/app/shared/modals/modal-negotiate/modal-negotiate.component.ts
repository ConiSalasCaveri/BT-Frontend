import { DtDaytimeComponent } from './../../datetimepicker/dt-daytime/dt-daytime.component';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { PetitionOfferModel } from 'src/app/petition/petition-detail/petition-detail-petitioners/petitioners-negotiate/models/petition-offer.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Payment } from '../../models/petition/petition-payment.model';
import { Subscription } from 'rxjs';
import { PetitionersNegotiateMediatorService } from '../../services/petitioners-negotiate-mediator.service';
import { Roles } from 'src/app/petition/petition-detail/petition-detail-petitioners/petitioners-negotiate/models/roles.model';
import { NegotiateOfferModel } from 'src/app/petition/petition-detail/petition-detail-petitioners/petitioners-negotiate/models/negotiate-offer.model';
import { ChildActivationEnd } from '@angular/router';
import { asTextData } from '@angular/core/src/view';
import { PetitionService } from '../../services/petition.service';
import { MapperService } from '../../services/mapper.service';

@Component({
  selector: 'app-modal-negotiate',
  templateUrl: './modal-negotiate.component.html',
  styleUrls: ['./modal-negotiate.component.scss']
})
export class ModalNegotiateComponent implements OnInit, OnDestroy {

  @Input() petition: PetitionOfferModel;

  public modalNegotiateForm: FormGroup;
  public priceImprovement = false;
  public deliveryOnSiteStart: Date;
  public payment: Payment;
  public shippingCostOwner: Roles;
  public paymentPeriod: any;
  public paymentPeriodData: any;
  public deliveryonsiteStart: Date;
  @ViewChild(DtDaytimeComponent) selectDate: DtDaytimeComponent;

  private subscription: Subscription;
  constructor(
    private mediatorService: PetitionersNegotiateMediatorService,
    private petitionService: PetitionService,
    private mapperService: MapperService
  ) { }

  ngOnInit() {
    const mapper = this.mapperService.paymentPeriodTextMapper();
    this.paymentPeriodData = Object.keys(mapper).map((item: any) => ({id: parseInt(item, 32), text: `${mapper[item]}`}));
    this.modalNegotiateForm = new FormGroup({
      'payment': new FormControl(''),
      'paymentPeriod': new FormControl(''),
      'deliveryonsiteStart': new FormControl(''),
      'shippingCostOwner': new FormControl(''),
      'priceImprovement': new FormControl('')
    });
    this.subscription = this.mediatorService.submit.subscribe((petition) => {
      if (petition) {
        this.setInputValues(petition);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setInputValues(petitionData: PetitionOfferModel) {
    this.selectDate.selected = new Date();
    if (petitionData.deliveryOnSiteDateStart) {
      this.setDeliveryOnSiteStart(petitionData.deliveryOnSiteDateStart);
    }
    this.setPayment(petitionData.payment);
    this.setShippingCostOwner(petitionData.shippingCostOwner);
    this.paymentPeriod = petitionData.paymentPeriod;
  }


  public setDeliveryOnSiteStart(data: any) {
    this.deliveryOnSiteStart = new Date(data);
    this.modalNegotiateForm.controls['deliveryonsiteStart'].setValue(this.deliveryOnSiteStart.toLocaleString());
  }

  public setPayment(payment: Payment) {
    this.payment = payment;
  }

  public setShippingCostOwner(role: Roles) {
    this.shippingCostOwner = role;
  }

  public onChange(data: boolean) {
    this.priceImprovement = data;
  }

  public onSubmit() {
    const request = new NegotiateOfferModel ({
      payment: this.payment,
      paymentPeriod: this.paymentPeriod,
      shippingCostOwner: this.shippingCostOwner,
      deliveryOnSiteDateStart: this.deliveryOnSiteStart,
      priceImprovement: this.priceImprovement
    });

    console.log(request);

    (<any>$('#ModalNegotiate')).modal('hide');
    this.mediatorService.emitOffer(request);
    this.priceImprovement = false;
  }
}
