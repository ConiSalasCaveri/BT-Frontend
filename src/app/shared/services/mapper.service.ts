import { Injectable } from '@angular/core';

@Injectable()
export class MapperService {
  statusTextMapper() {
    return {
      '1': 'Borrador',
      '2': 'En observación',
      '3': 'Observada',
      '4': 'Rechazada',
      '5': 'Publicada',
      '6': 'Anulada',
      '7': 'En negociación',
      '8': 'Anulada',
      '9': 'Adjudicada',
      '10': 'Pagada',
      '11': 'Pentiente de pago',
      '12': 'Anulada',
      '13': 'Anulada por sistema',
      '14': 'Finalizada'
    };
  }

  finishStatusMapper() {
    return {
      '14': 'Finalizada'
    };
  }

  negotiateStatusMapper() {
    return {
      '7': 'En negociación',
      '8': 'Anulada'
    };
  }

  publishStatusMapper() {
    return {
      '5': 'Publicada',
      '6': 'Anulada'
    };
  }

  draftStatusMapper() {
    return {
      '1': 'Borrador',
      '2': 'En observación',
      '3': 'Observada',
      '4': 'Rechazada'
    };
  }

  awardedStatusTextMapper() {
    return {
      '10': 'Pagada',
      '11': 'Pentiente de pago',
      '12': 'Anulada',
      '13': 'Anulada por sistema'
    };
  }

  statusGroupsTextMapper() {
    return {
      '1': 'Borrador',
      '2': 'Publicada',
      '3': 'En negociación',
      '4': 'Adjudicada',
      '5': 'Finalizada'
    };
  }

  rolesTextMapper() {
    return {
      '1': 'Solicitante',
      '2': 'Proveedor'
    };
  }

  paymentPeriodTextMapper() {
    return {
      '1': '30 días',
      '2': '90 días',
      '3': '120 días'
    };
  }

  paymentTextMapper() {
    return {
      '1': 'Debin',
      '2': 'Pyme Nación',
      '3': 'Pago electrónico'
    };
  }
}
