import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { PageParams } from '../models/pageparams.model';
import { SortParams } from '../models/searchparams.model';
import { PetitionModel } from '../../petition/petition-create/models/petition.model';
import { BehaviorSubject } from 'rxjs';
import { PetitionState } from 'src/app/petition/models/petition-state.model';
import { Payment } from '../models/petition/petition-payment.model';
import { DatePipe } from '@angular/common';

@Injectable()
export class PetitionService {
  private petition: any;
  private nullifyData: any;
  private petitionSubject = new BehaviorSubject(new PetitionModel());
  public currentPetitionSubject = this.petitionSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  setPetition(petition: any) {
    this.petition = petition;
  }

  getPetition() {
    return this.petition;
  }

  getFinished(petitionId: string) {
    return this.httpClient.get<any>('./assets/data/finished.json');
  }

  getAwardedAnonymous(petitionId: string) {
    return this.httpClient.get<any>('./assets/data/awardedAnonymous.json');
  }

  getAwardedChosen(petitionId: string) {
    return this.httpClient.get<any>('./assets/data/awardedChosen.json');
  }

  getPetitionProducts(petitionId: string) {
    return this.httpClient.get<any>('./assets/data/petitionProducts.json');
  }

  getPetitionOffers(type: number) {
    return this.httpClient.get<any>('./assets/data/petitionOffersTotal.json');
  }

  getPetitionOffersSubcategory(type: number) {
    return this.httpClient.get<any>('./assets/data/petitionOfferSubcategory.json');
  }

  getPetitionAssignedCriteriaTotal(type: number) {
    return this.httpClient.get<any>('./assets/data/petitionAssignedCriteriaTotal.json');
  }

  getPetitionAssignedCriteriaSubcategory(type: number) {
    return this.httpClient.get<any>('./assets/data/petitionAssignedCriteriaSubcategory.json');
  }

  changePetitionSubject(p: PetitionModel) {
    this.petitionSubject.next(p);
  }

  getPetitionsDraft(p1: any, p2: any, p3: any, p4: any, filtersParams?: any) {
    return this.httpClient.get<any>('./assets/data/listdraft.json');
  }

  getPetitionsPublish(p1: any, p2: any, p3: any, p4: any, filtersParams?: any) {
    return this.httpClient.get<any>('./assets/data/listpublish.json');
  }

  getPetitionsNegotiate(p1: any, p2: any, p3: any, p4: any, filtersParams?: any) {
    return this.httpClient.get<any>('./assets/data/listnegotiate.json');
  }

  getPetitionsAwarded(p1: any, p2: any, p3: any, p4: any, filtersParams?: any) {
    console.log('filter params: ', filtersParams);
    return this.httpClient.get<any>('./assets/data/listawarded.json');
  }

  getPetitionsFinish(p1: any, p2: any, p3: any, p4: any, filtersParams?: any) {
    return this.httpClient.get<any>('./assets/data/listfinish.json');
  }

  getPetitionById(id: string) {
    return this.httpClient.get<any>('./assets/data/dataForDraft.json');
  }

  getPetitionByIdDetail(id: string) {
    return this.httpClient.get<any>('./assets/data/dataForDetail.json');
  }

  getPayments() {
    return this.httpClient.get<any>('./assets/data/paymentData.json');
  }

  getPetitionsList(pageParams: PageParams, sortParams: SortParams, search: string, petitionGroup: number) {
    return this.httpClient
        .get<any>(`${this.configService.getProperty('apiUrl')}/petition`, {
          params: {
            'pageParams.skip': pageParams.skip.toString(),
            'pageParams.take': pageParams.take.toString(),
            'sortParams.sortBy': sortParams.sortBy,
            'sortParams.sortDir': sortParams.sortDir,
            'search': search,
            'state': petitionGroup.toString()
          }
        });
  }

  saveOffer(offer: any) {
    return this.httpClient.post<any>(`${this.configService.getProperty('apiUrl')}`, offer);
  }

  // TODO: improve method
  isDraftStatusToDisable(status: PetitionState) {
    if (status === PetitionState.Draft_Rejected || status === PetitionState.Draft_UnderTest) {
      return true;
    } else {
      return false;
    }
  }
  //

  nullifyStates() {
    return [6, 8, 12, 13];
  }

}
