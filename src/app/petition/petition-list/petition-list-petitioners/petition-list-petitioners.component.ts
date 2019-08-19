import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { PetitionersListMediatorService } from '../../../shared/services/petitioners-list-mediator.service';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { CategoryService } from '../../../shared/services/category.service';
import { SubcategoryService } from '../../../shared/services/subcategory.service';
import { PetitionsGroups } from './models/petitions-list-enum.model';
import { FiltersMediatorService } from 'src/app/shared/services/filters-mediator.service';

@Component({
  selector: 'app-petition-list-petitioners',
  templateUrl: './petition-list-petitioners.component.html',
  styleUrls: ['./petition-list-petitioners.component.scss']
})
export class PetitionListPetitionersComponent implements OnInit, OnDestroy, AfterViewChecked {

  private subscriptionNotificacion: Subscription;
  private currentChild: PetitionsGroups;
  public categories = [];
  public subcategories = [];
  public states = [];
  public selectedCategoryId: any;
  public selectedSubcategoryId: any;
  public selectedState: any;
  public selectedExpirationDate = '';
  public selectedDeliveryDate = '';

  constructor(
    private mediatorService: PetitionersListMediatorService,
    private notification: NotificationsService,
    private categoryService: CategoryService,
    private filterMediatorService: FiltersMediatorService,
    private subcategoryService: SubcategoryService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptionNotificacion = this.mediatorService.notification.subscribe(x => {
      this.notification.show({
        data: { text: x.text },
        type: x.notificationType
      });
    });
    this.getCategories();
    this.getSubcategories();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptionNotificacion.unsubscribe();
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  private getSubcategories() {
    this.subcategoryService.getSubcategories('').subscribe(response => {
      this.subcategories = response.data;
    });
  }

  public setExpirationDate (data: any) {
    this.selectedExpirationDate = new Date(data).toLocaleDateString();
  }

  public setDeliveryDate (data: any) {
    this.selectedDeliveryDate = new Date(data).toLocaleDateString();
  }

  public logRequest() {
    console.log('estado: ', this.selectedState);
    console.log('vencimiento: ', this.selectedExpirationDate);
    console.log('entrega: ', this.selectedDeliveryDate);
    console.log('subrubro: ', this.selectedSubcategoryId);
    console.log('rubro: ', this.selectedCategoryId);
    this.onSubmit();
  }

  public clearRequest() {
    this.selectedState = null;
    this.selectedExpirationDate = null;
    this.selectedDeliveryDate = null;
    this.selectedSubcategoryId = null;
    this.selectedCategoryId = null;
    console.log('estado: ', this.selectedState);
    console.log('vencimiento: ', this.selectedExpirationDate);
    console.log('entrega: ', this.selectedDeliveryDate);
    console.log('subrubro: ', this.selectedSubcategoryId);
    console.log('rubro: ', this.selectedCategoryId);
  }


  public onSubmit() {
    const request = {
      filters: {
        categoryId: this.selectedCategoryId,
        subcategoryId: this.selectedSubcategoryId,
        state: this.selectedState,
        expirationDate: this.selectedExpirationDate,
        deliveryDate: this.selectedDeliveryDate
      },
      group: this.currentChild
    };

    this.filterMediatorService.emitFilter(request);
  }

  private setStates(data: any) {
    this.states = data.states;
    this.currentChild = data.group;
    this.selectedState = null;
  }
}
