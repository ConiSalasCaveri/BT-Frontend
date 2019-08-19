import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignUpSuppliersRequest } from './models/sign-up-suppliers-request.model';
import { SignUpSuppliersService } from './sign-up-suppliers.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { SignUpPetitionersService } from '../sign-up-form-petitioners/sign-up-petitioners.service';
import { MustMatch } from 'src/app/shared/services/form-validator.service';

@Component({
  selector: 'app-sign-up-form-suppliers',
  templateUrl: './sign-up-form-suppliers.component.html',
  styleUrls: ['./sign-up-form-suppliers.component.scss'],
  animations: [
    trigger('auth', [
      transition ('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(650, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition ('* => void', [
        animate(650, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SignUpFormSuppliersComponent implements OnInit {

  public signUpSupplierForm: FormGroup;
  public cuit: string;
  public provinces = [];
  public localities = [];
  public borderingProvinces = [];
  public selectedProvinces = [];
  public modalProvinces = [];
  public categories = [];
  public selectedCategories = [];
  public submitted = false;

  constructor(
    private signUpService: SignUpService,
    private signUpSupplierService: SignUpSuppliersService,
    private signUpPetitionersService: SignUpPetitionersService,
    private notification: NotificationsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.cuit = this.signUpService.getCuit();
    if (!this.cuit) {
      this.router.navigate(['signup/step1']);
    }
    this.validations();
    this.getProvinces();
    this.getCategories();
  }

  public createSupplierAccount() {
    if (!this.signUpSupplierForm.valid) {
      this.submitted = true;
      return;
    }
    const request = this.requestMapper();

    this.signUpSupplierService.createSupplierAccount(request).subscribe(() => {
      this.notification.show({
        data: { text: 'Verifica tu correo electrónico para activar tu cuenta Proveedor.' },
        type: NotificationType.iconSuccess
      });
      setTimeout(() => {
        this.router.navigate(['signin']);
      }, 3000);
    }, error => {
      if (error.status === 0) {
        this.notification.show({
          data: { text: 'Ocurrió un error en la conexión. Intente nuevamente.' },
          type: NotificationType.Error
        });
        return;
      }
      this.notification.show({
        data: { text: error.error.error.description },
        type: NotificationType.Error
      });
    });
  }

  public getCategories() {
    this.signUpSupplierService.getCategories().subscribe((result: any) => {
      this.categories = result.data;
    });
  }

  public getProvinces() {
    this.signUpSupplierService.getProvinces().subscribe((result: any) => {
      this.provinces = result.data;
    });
   }

  public getData(provinceId: any) {
   this.signUpSupplierService.getLocalities(parseInt(provinceId, 10)).subscribe((result: any) => {
     this.localities = result.data;
   });

   this.signUpSupplierService.getBorderingProvinces(parseInt(provinceId, 10)).subscribe((result: any) => {
     this.borderingProvinces = result.data.borderingProvincesModels;
     this.selectedProvinces = result.data.borderingProvincesModels;
     this.selectedProvinces.push(this.provinces.find(item => item.id === +parseInt(provinceId, 10)));
   });
  }

  public selectAllProvinces(data: boolean) {
    $('[name="check-province"]').prop('checked', data);
    if (data) {
      this.modalProvinces.forEach(item => this.pushProvince(item));
    } else {
      this.modalProvinces.forEach(item => this.popProvince(item));
    }
  }

  public getModalProvinces() {
    this.modalProvinces = this.provinces.filter(item => !this.selectedProvinces.some(other => item.id === other.id));
  }

  public popProvince(item: any) {
    const index = this.selectedProvinces.indexOf(item, 0);
    this.selectedProvinces.splice(index, 1);
  }

  public pushProvince(item: any) {
    this.selectedProvinces.push(item);
  }

  public selectAll(state: boolean) {
    $(`.custom-control-input`).prop('checked', state);
    // Hasta la separación del modal
    $(`#TermsConditionsCheck`).prop('checked', false);

    if (state) {
      const list = this.categories.map(x => x = {
        id: x.id,
        name: x.name,
        subcategories: x.subcategories
      });
      this.selectedCategories = list;
    } else {
      this.selectedCategories = [];
    }
  }

  public selectAllCategory(category: any, state: boolean, index: any) {
    $(`#SectorAllCheck`).prop('checked', false);
    $(`[name="check-subcategory${index}"]`).prop('checked', state);
    if (state) {
      this.pushCategory(category);
    } else {
      this.popCategory(category);
    }
  }

  public pushCategory(category: any) {
    if (!this.selectedCategories.find(x => x.id === category.id)) {
      const c = this.categories.find(x => x.id === category.id);
      const categoryToPush = {
        id: c.id,
        name: c.name,
        subcategories: c.subcategories
      };
      this.selectedCategories.push(categoryToPush);
    }
  }

  public pushSubcategory(subcategory: any, category: any, indexCategory?: number) {
    const categoryFound = this.selectedCategories.find(x => x.id === category.id);
    if (categoryFound) {
      categoryFound.subcategories.push(subcategory);
    } else {
      $(`#${indexCategory}`).prop('checked', true);
      const categoryToPush = {
        id: category.id,
        name: category.name,
        subcategories: [
          {
            id: subcategory.id,
            name: subcategory.name
          }
        ]
      };
      this.selectedCategories.push(categoryToPush);
    }
  }

  public popCategory(category: any) {
    this.selectedCategories = this.selectedCategories.filter(x => x.id !== category.id);
    $(`#SectorAllCheck`).prop('checked', false);
    const categoryFound = this.categories.find(x => x.id === category.id);
    $(`[name="${category.id}"]`).prop('checked', false);
    categoryFound.subcategories.forEach(element => {
      $(`#${element.id}`).prop('checked', false);
    });
  }

  public popSubcategory(subcategory: any, category: any, indexCategory: number) {
    $(`#SectorAllCheck`).prop('checked', false);
    const categoryFound = this.selectedCategories.find(x => x.id === category.id);
    if (categoryFound) {
      categoryFound.subcategories = categoryFound.subcategories.filter((x: any) => x.id !== subcategory.id);
      if (!categoryFound.subcategories.length) {
        this.selectedCategories = this.selectedCategories.filter(x => x.id !== categoryFound.id);
        $(`#${indexCategory}`).prop('checked', false);
      }
    } else {
      return;
    }
  }

  private mapSubcategories() {
    const result = [];
    this.selectedCategories.forEach(x => {
      x.subcategories.forEach(y => result.push(y.id));
    });
    return result;
  }

  private validations() {
    this.signUpSupplierForm = this.formBuilder.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]),
      'passwordRepeat': new FormControl('', Validators.required),
      'businessName': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'streetNumber': new FormControl('', Validators.required),
      'apartment': new FormControl(''),
      'postCode': new FormControl('', Validators.required),
      'locality': new FormControl(null, Validators.required),
      'province': new FormControl(null, Validators.required),
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'amEmail': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'amPhone': new FormControl('', Validators.required),
      'terms': new FormControl('', Validators.requiredTrue),
      'areaCode': new FormControl('', Validators.required),
    },
    {
      validator: MustMatch('password', 'passwordRepeat')
    });
  }

  private requestMapper(): SignUpSuppliersRequest {
    return {
      cuit: this.cuit,
      email: this.signUpSupplierForm.controls['email'].value,
      password: this.signUpSupplierForm.controls['password'].value,
      passwordRepeat: this.signUpSupplierForm.controls['passwordRepeat'].value,
      businessName: this.signUpSupplierForm.controls['businessName'].value,
      phone: this.signUpSupplierForm.controls['phone'].value,
      street: this.signUpSupplierForm.controls['street'].value,
      streetNumber: this.signUpSupplierForm.controls['streetNumber'].value,
      apartment: this.signUpSupplierForm.controls['apartment'].value,
      postCode: this.signUpSupplierForm.controls['postCode'].value,
      localityId: <number>this.signUpSupplierForm.controls['locality'].value,
      provinceId: <number>this.signUpSupplierForm.controls['province'].value,
      name: this.signUpSupplierForm.controls['name'].value,
      lastName: this.signUpSupplierForm.controls['lastName'].value,
      emailAccountManager: this.signUpSupplierForm.controls['amEmail'].value,
      phoneAccountManager: this.signUpSupplierForm.controls['amPhone'].value,
      termsAndConditions: this.signUpSupplierForm.controls['terms'].value,
      tokenCaptcha: this.signUpService.getToken(),
      subcategoryIds: this.mapSubcategories(),
      provinceIds: this.selectedProvinces.map(x => x.id)
    };
  }

}

