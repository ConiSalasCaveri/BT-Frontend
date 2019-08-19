import { MapperService } from './../../../shared/services/mapper.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PetitionModel } from '../models/petition.model';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { Subscription } from 'rxjs';
import { PetitionCreateMediatorService } from 'src/app/shared/services/petition-create-mediator.service';
import { Payment } from 'src/app/shared/models/petition/petition-payment.model';

@Component({
  selector: 'app-petition-create-basic-data',
  templateUrl: './petition-create-basic-data.component.html',
  styleUrls: ['./petition-create-basic-data.component.scss'],
})
export class PetitionCreateBasicDataComponent implements OnInit, OnDestroy, OnChanges {

  public offerDate: Date;
  public awardedDate: Date;
  public basicDataForm: FormGroup;
  public paymentData = [];
  public state: any;
  public disabled = false;
  public restrictedExpiration: Date = new Date();
  public restrictedAssigned = new Date();
  private submitSubscription: Subscription;
  @Output() changeChild = new EventEmitter<string>();
  @Output() isValid = new EventEmitter<boolean>();
  @Input() parentPetition: any;

  constructor(
    private petitionService: PetitionService,
    private mediatorService: PetitionCreateMediatorService
  ) {}

  ngOnInit() {
    this.petitionService.getPayments().subscribe(response => {
      this.paymentData = response.data;
    });

    if (!this.parentPetition) {
      const servicePetition = this.petitionService.getPetition();
      if (servicePetition) {
        this.setInputValues(servicePetition);
      }
    }

    this.submitSubscription = this.mediatorService.submit.subscribe((x) => {
      if (x) {
        this.isValid.emit(this.basicDataForm.valid);
      }
    });
  }

  ngOnChanges() {
    this.basicDataForm = new FormGroup({
      'name': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'outerCode': new FormControl({ value: '', disabled: this.disabled }, Validators.pattern('[0-9]*')),
      'offerDate': new FormControl({ value: '', disabled: this.disabled }, ValidateDate),
      'awardedDate': new FormControl({ value: '', disabled: this.disabled }, ValidateDate),
      'payment': new FormControl({ value: null, disabled: this.disabled }, Validators.required),
    });
    if (this.parentPetition) {
      this.setInputValues(this.parentPetition);
    }
  }

  ngOnDestroy() {
    this.onSubmit();
    if (this.basicDataForm) {
      this.isValid.emit(this.basicDataForm.valid);
    }
    this.submitSubscription.unsubscribe();
  }

  public onSubmit() {
    const petition = this.petitionService.getPetition();
    const request = new PetitionModel ({
      name: this.basicDataForm.controls['name'].value,
      outercode: this.basicDataForm.controls['outerCode'].value,
      offerExpirationDate: this.offerDate,
      awardedDate: this.awardedDate,
      payment: this.basicDataForm.controls['payment'].value
    });

    if (petition) {
      this.petitionService.setPetition(Object.assign(petition, request));
    } else {
      this.petitionService.setPetition(request);
    }
  }

  public setAwardedDate(data: any) {
    this.awardedDate = new Date(data);
    this.basicDataForm.controls['awardedDate'].setValue(this.awardedDate);
  }

  public setOfferDate(data: any) {
    this.offerDate = new Date(data);
    this.restrictedAssigned.setDate(this.offerDate.getDate());
    this.setAwardedDate(this.offerDate);
    this.basicDataForm.controls['offerDate'].setValue(this.offerDate);
  }

  public setPayment(payment: Payment) {
    this.basicDataForm.controls['payment'].setValue(payment);
  }

  private setInputValues(petitionData: PetitionModel) {
    if (petitionData.awardedDate) {
      this.setAwardedDate(petitionData.awardedDate);
    }
    if (petitionData.offerExpirationDate) {
      this.setOfferDate(petitionData.offerExpirationDate);
    }
    if (petitionData.payment) {
      this.setPayment(petitionData.payment);
    }
    this.basicDataForm.controls['name'].setValue(petitionData.name !== undefined ? petitionData.name : '');
    this.basicDataForm.controls['outerCode'].setValue(petitionData.outercode);
    this.state = petitionData.state;
    this.disabled = this.petitionService.isDraftStatusToDisable(petitionData.state);
  }

  public next() {
    this.changeChild.emit('petition-create-deliver-detail');
  }
}

export function ValidateDate(control: AbstractControl) {
  if (control.value === '') {
    return { ValidateDate: false };
  }
}

export function ValidatePayment(control: AbstractControl) {
  if (Payment[this.payment] === null) {
    return { ValidatePayment: false };
  }
}
