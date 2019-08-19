export class NotificationType {
  public static readonly Error = new NotificationType('error');
  public static readonly Success = new NotificationType('success');
  public static readonly Info = new NotificationType('info');
  public static readonly iconSuccess = new NotificationType('iconSuccess');
  public static readonly iconError = new NotificationType('iconError');
  public static readonly petitionNullify = new NotificationType('petitionnullify');


  constructor(private type: string) { }

  public getType() {
    return this.type;
  }
}
