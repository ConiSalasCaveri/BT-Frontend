import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { PetitionOfferModel } from 'src/app/petition/petition-detail/petition-detail-petitioners/petitioners-negotiate/models/petition-offer.model';
import { NegotiateOfferModel } from 'src/app/petition/petition-detail/petition-detail-petitioners/petitioners-negotiate/models/negotiate-offer.model';

@Injectable()
export class PetitionersNegotiateMediatorService {
  private subject = new Subject<PetitionOfferModel>();
  private subjectOffer = new Subject<NegotiateOfferModel>();

  submit = this.subject.asObservable();
  submitOffer = this.subjectOffer.asObservable();

  constructor() {}

  public emitOffer(data: NegotiateOfferModel) {
    if (data) {
      this.subjectOffer.next(data);
    }
  }

  public emit(data: PetitionOfferModel) {
    if (data) {
      this.subject.next(data);
    }
  }
}
