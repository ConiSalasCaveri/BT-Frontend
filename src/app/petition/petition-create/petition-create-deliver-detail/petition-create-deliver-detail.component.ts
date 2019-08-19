import { ProvinceService } from 'src/app/shared/services/province.service';
import { LocalityService } from './../../../shared/services/locality.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { Select2OptionData } from 'ng2-select2';
import { PetitionModel } from '../models/petition.model';
import { Subscription } from 'rxjs';
import { PetitionCreateMediatorService } from 'src/app/shared/services/petition-create-mediator.service';

@Component({
  selector: 'app-petition-create-deliver-detail',
  templateUrl: './petition-create-deliver-detail.component.html',
  styleUrls: ['./petition-create-deliver-detail.component.scss']
})
export class PetitionCreateDeliverDetailComponent implements OnInit, OnDestroy {

  public deliveryonsiteStart: Date;
  public deliveryonsiteEnd: Date;
  public deliverDetailForm: FormGroup;
  public state: any;
  public disabled = false;
  public localityData = [];
  public provinceData = [];
  public restrictedStart: Date = new Date();
  public restrictedEnd = new Date();
  private submitSubscription: Subscription;

  @Output() changeChild = new EventEmitter<string>();
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private petitionService: PetitionService,
    private localityService: LocalityService,
    private provinceService: ProvinceService,
    private mediatorService: PetitionCreateMediatorService
  ) { }

  ngOnInit() {
    this.deliverDetailForm = new FormGroup({
      'street': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'number': new FormControl({ value: '', disabled: this.disabled }, [
        Validators.required,
        Validators.pattern('[0-9]*')]),
      'apartment': new FormControl({ value: '', disabled: this.disabled }),
      'postcode': new FormControl({ value: '', disabled: this.disabled }, Validators.required),
      'deliveryonsiteStart': new FormControl({ value: '', disabled: this.disabled }, ValidateDate),
      'deliveryonsiteEnd': new FormControl({ value: '', disabled: this.disabled }, ValidateDate),
      'province': new FormControl({ value: null, disabled: this.disabled }, Validators.required),
      'locality': new FormControl({ value: null, disabled: this.disabled }, Validators.required),
    });

    this.provinceService.getProvinces().subscribe(data => {
      this.provinceData = data.data;
    });
    this.localityService.getLocalities('provinceId').subscribe(response => {
      this.localityData = response.data;
    });


    const servicePetition = this.petitionService.getPetition();
    if (servicePetition) {
      this.setInputValues(servicePetition);
    }

    this.submitSubscription = this.mediatorService.submit.subscribe((x) => {
      if (x) {
        this.isValid.emit(this.deliverDetailForm.valid);
      }
    });
  }

  ngOnDestroy() {
    this.submitSubscription.unsubscribe();
    if (this.deliverDetailForm) {
      this.isValid.emit(this.deliverDetailForm.valid);
    }
    this.onSubmit();
  }

  public onSubmit() {
    const petition = this.petitionService.getPetition();
    const request = new PetitionModel ({
      street: this.deliverDetailForm.controls['street'].value,
      streetNumber: this.deliverDetailForm.controls['number'].value,
      apartment: this.deliverDetailForm.controls['apartment'].value,
      postCode: this.deliverDetailForm.controls['postcode'].value,
      provinceId: this.deliverDetailForm.controls['province'].value,
      localityId: this.deliverDetailForm.controls['locality'].value,
      deliveryOnSiteDateEnd: this.deliveryonsiteEnd,
      deliveryOnSiteDateStart: this.deliveryonsiteStart
    });

    if (petition) {
      this.petitionService.setPetition(Object.assign(petition, request));
    } else {
      this.petitionService.setPetition(request);
    }
  }

  public setDeliveryOnSiteStart (data: any) {
    this.deliveryonsiteStart = new Date(data);
    this.restrictedEnd.setDate(this.deliveryonsiteStart.getDate());
    this.setDeliveryOnSiteEnd(this.deliveryonsiteStart);
    this.deliverDetailForm.controls['deliveryonsiteStart'].setValue(this.deliveryonsiteStart);
  }

  public setDeliveryOnSiteEnd(data: any) {
    this.deliveryonsiteEnd = new Date(data);
    this.deliverDetailForm.controls['deliveryonsiteEnd']
    .setValue(this.deliveryonsiteEnd);
  }

  private setInputValues(petitionData: PetitionModel) {
    if (petitionData.deliveryOnSiteDateStart) {
      this.setDeliveryOnSiteStart(petitionData.deliveryOnSiteDateStart);
    }
    if (petitionData.deliveryOnSiteDateEnd) {
      this.setDeliveryOnSiteEnd(petitionData.deliveryOnSiteDateEnd);
    }
    if (petitionData.localityId) {
      this.deliverDetailForm.controls['locality'].setValue(petitionData.localityId);
    }
    if (petitionData.provinceId) {
      this.deliverDetailForm.controls['province'].setValue(petitionData.provinceId);
    }
    this.deliverDetailForm.controls['street'].setValue(petitionData.street !== undefined ? petitionData.street : '');
    this.deliverDetailForm.controls['number'].setValue(petitionData.streetNumber);
    this.deliverDetailForm.controls['postcode']
      .setValue(petitionData.postCode !== undefined ? petitionData.postCode : '');
    this.deliverDetailForm.controls['apartment']
      .setValue(petitionData.apartment !== undefined ? petitionData.apartment : '');
    this.state = petitionData.state;
    this.disabled = this.petitionService.isDraftStatusToDisable(petitionData.state);
  }

  public next() {
    this.changeChild.emit('petition-create-items');
  }

  public back() {
    this.changeChild.emit('petition-create-basic-data');
  }
}

export function ValidateDate(control: AbstractControl) {
  if (control.value === '') {
    return { ValidateDate: false };
  }
}
