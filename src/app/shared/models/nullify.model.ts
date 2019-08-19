export class NullifyModel {
  constructor(nullify: NullifyModel) {
    this.id = nullify.id;
    this.petitionId = nullify.petitionId;
    this.observation = nullify.observation;
  }
  id: string;
  petitionId: string;
  observation: string;
}
