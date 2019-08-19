export interface SignUpSuppliersRequest {
  cuit: string;
  email: string;
  password: string;
  passwordRepeat: string;
  businessName: string;
  phone: string;
  street: string;
  streetNumber: string;
  apartment: string;
  postCode: string;
  localityId: number;
  provinceId: number;
  name: string;
  lastName: string;
  emailAccountManager: string;
  phoneAccountManager: string;
  termsAndConditions: string;
  tokenCaptcha: string;
  subcategoryIds: Array<string>;
  provinceIds: Array<number>;
}
