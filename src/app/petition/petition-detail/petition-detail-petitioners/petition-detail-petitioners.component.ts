import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { PetitionersNegotiateMediatorService } from 'src/app/shared/services/petitioners-negotiate-mediator.service';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { ActivatedRoute, Router } from '@angular/router';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionersListMediatorService } from '../../../shared/services/petitioners-list-mediator.service';
import { PetitionNullifyType } from '../../models/petition-nullify-type.enum';

@Component({
  selector: 'app-petition-detail-petitioners',
  templateUrl: './petition-detail-petitioners.component.html',
  styleUrls: ['./petition-detail-petitioners.component.scss']
})
export class PetitionDetailPetitionersComponent implements OnInit, OnDestroy {
  public petitionersDetail: string;
  public petition: any;
  public nullify: any;
  public response: any;
  public isAwardedStatus: boolean;
  public isNegotiateStatus: boolean;
  public isAssignedCriteria: boolean;

  private subscription: Subscription;
  private subscriptionNotificacion: Subscription;
  constructor(
    private notification: NotificationsService,
    private mediatorNegotiateService: PetitionersNegotiateMediatorService,
    private mediatorNotificationService: PetitionersListMediatorService,
    private route: ActivatedRoute,
    private petitionService: PetitionService,
    private router: Router
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.petitionService.getPetitionByIdDetail(id).subscribe(response => {
      this.petition = response;
      this.petitionService.setPetition(response);
      this.checkStatusPermissions(response.state);
      this.isNullify(response);
      this.setInitialDetail(response.state);
    });

    this.subscriptionNotificacion = this.mediatorNotificationService.notification.subscribe(x => {
      this.notification.show({
        data: { text: x.text },
        type: x.type
      });

      // TODO: Remove this when add notifications to list pannel
      setTimeout(() => {
        this.router.navigate(['petition/list/petitioners']);
      }, 3000);
      //
    });

    this.subscription = this.mediatorNegotiateService.submitOffer.subscribe((offer) => {
      if (offer) {
       this.saveOffer(offer);
      }
    });
  }

  private saveOffer(offer: any) {
    this.petitionService.saveOffer(offer).subscribe(() => {
      this.notification.show({
       data: { text: `El proveedor sera notificado para que mejore su oferta.` },
       type: NotificationType.iconSuccess
     });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionNotificacion.unsubscribe();
  }

  public changeChild(data: any) {
    this.petitionersDetail = data;
  }

  private setInitialDetail(state: number) {
    const states = this.statesDictionary();
    if (states.petitionersBasicData.some(x => x === state)) {
      this.petitionersDetail = 'petitioners-basic-data';
    }
    if (states.petitionersNegotiate.some(x => x === state)) {
      this.petitionersDetail = 'petitioners-negotiate';
    }
    if (states.petitionersAwarded.some(x => x === state)) {
      this.petitionersDetail = 'petitioners-assigned';
    }
  }

  private checkStatusPermissions(state: number) {
    const states = this.statesDictionary();
    const today = new Date();
    this.isNegotiateStatus = states.petitionersNegotiate.some(x => x === this.petition.state);
    this.isAwardedStatus = states.petitionersAwarded.some(x => x === this.petition.state);
    this.isAssignedCriteria = states.petitionersNegotiate
      .some(x => x === this.petition.state)
      && today > new Date(this.petition.awardedDate)
      && this.petition.state !== 8;
  }

  private statesDictionary() {
    return {
      petitionersBasicData: [5, 6],
      petitionersNegotiate: [7, 8],
      petitionersAwarded: [9, 10, 11, 12, 13]
    };
  }

  private isNullify(petition: any) {
    const nullifyStates = this.petitionService.nullifyStates();
    if (nullifyStates.includes(petition.state)) {
      let header = {};
      if (petition.nullify.type === PetitionNullifyType.system) {
        header = {
          headerTitle: 'Anulada',
          headerDescription: 'La solicitud ha sido anulada por el administrador del sistema.',
          headerInformation: 'Para más información puede comunicarse directamente con el administrador del Sistema: Tel: 4444-4444.'
        };
      } else if (petition.nullify.type === PetitionNullifyType.user)  {
        header = {
          headerTitle: 'Anulada',
          headerDescription: 'La solicitud ha sido anulada por el solicitante.'
        };
      }
      this.nullify = Object.assign(petition.nullify, header);
      this.notification.show({
        data: { text: `La solicitud de compra ha sido anulada por el usuario ${petition.user}.` },
        type: NotificationType.petitionNullify
      });
    }
  }

}
