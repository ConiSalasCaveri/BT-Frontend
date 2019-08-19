import { CategoryService } from './../../../shared/services/category.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionProductModel } from '../models/petition-product.model';
import { Subscription } from 'rxjs';
import { PetitionCreateMediatorService } from 'src/app/shared/services/petition-create-mediator.service';
import { UnitService } from 'src/app/shared/services/unit.service';
import { SubcategoryService } from 'src/app/shared/services/subcategory.service';

@Component({
  selector: 'app-petition-create-items',
  templateUrl: './petition-create-items.component.html',
  styleUrls: ['./petition-create-items.component.scss']
})
export class PetitionCreateItemsComponent implements OnInit, OnDestroy {

  public products: Array<PetitionProductModel> = [];
  public product: any;
  public itemsForm: FormGroup;
  public state: any;
  public disabled = false;
  private submitSubscription: Subscription;
  public categoryData = [];
  public subcategoryData = [];
  public unitData = [];
  public validFields = false;

  @Output() changeChild = new EventEmitter<string>();
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private petitionService: PetitionService,
    private serviceMediator: PetitionCreateMediatorService,
    private unitService: UnitService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) { }

  ngOnInit() {
    this.itemsForm = new FormGroup({
      'category': new FormControl({ value: null, disabled: this.disabled }),
      'subcategory': new FormControl({ value: null, disabled: this.disabled }),
      'unit': new FormControl({ value: null, disabled: this.disabled }),
    });
    this.product = {};

    this.unitService.getUnits().subscribe(response => {
      this.unitData = response.data;
    });

    this.categoryService.getCategories().subscribe(response => {
      this.categoryData = response.data;
    });

    this.subcategoryService.getSubcategories('categoryId').subscribe(response => {
      this.subcategoryData = response.data;
    });

    const servicePetition = this.petitionService.getPetition();
    if (servicePetition) {
      this.setInputValues(servicePetition);
    }

    this.submitSubscription = this.serviceMediator.submit.subscribe((x) => {
      if (x) {
        this.isValid.emit(this.itemsForm.valid);
        this.validFields = false;
      }
    });
  }

  ngOnDestroy() {
    this.onSubmit();
    if (!this.products.length) {
      this.isValid.emit(false);
      return;
    }
    if (this.itemsForm) {
      this.isValid.emit(this.itemsForm.valid);
    }
    this.submitSubscription.unsubscribe();
  }

  private onSubmit() {
    const petition = this.petitionService.getPetition();
    const request = {
      products: this.products
    };

    if (petition) {
      this.petitionService.setPetition(Object.assign(petition, request));
    } else {
      this.petitionService.setPetition(request);
    }
  }

  public addProduct() {
    if (this.validateAction()) {
      return;
    }
    this.pushProduct();
    this.itemsForm.controls['category'].setValue(null);
    this.itemsForm.controls['subcategory'].setValue(null);
    this.itemsForm.controls['unit'].setValue(null);
    this.product = {};
  }

  private pushProduct() {
    this.validFields = false;
    this.product.categoryId = this.itemsForm.controls['category'].value;
    this.product.subcategoryId = this.itemsForm.controls['subcategory'].value;
    this.product.unitId = this.itemsForm.controls['unit'].value;
    this.products.push(this.product);
  }

  public removeProduct(index: number) {
    this.products.splice(index, 1);
  }

  public duplicateRow() {
    if (this.validateAction()) {
      return;
    }
    this.pushProduct();
    this.itemsForm.controls['category'].setValue(this.product.categoryId);
    this.itemsForm.controls['subcategory'].setValue(this.product.subcategoryId);
    this.itemsForm.controls['unit'].setValue(null);
    this.product = {};
    this.product.categoryId = this.itemsForm.controls['category'].value;
    this.product.subcategoryId = this.itemsForm.controls['subcategory'].value;
  }

  private setInputValues(petitionData: any) {
    if (petitionData.products) {
      this.products = petitionData.products;
    }
    this.state = petitionData.state;
    this.disabled = this.petitionService.isDraftStatusToDisable(petitionData.state);
  }

  public next() {
    this.changeChild.emit('petition-create-petition-type');
  }

  public back() {
    this.changeChild.emit('petition-create-deliver-detail');
  }

  private validateAction() {
    if (this.itemsForm.controls['category'].value === null ||
      this.itemsForm.controls['subcategory'].value === null ||
      this.itemsForm.controls['unit'].value === null ||
      this.product.name === undefined ||
      this.product.amount === undefined) {
        this.validFields = true;
        return true;
    }
  }

}
