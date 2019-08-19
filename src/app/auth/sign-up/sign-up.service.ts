import { Injectable } from '@angular/core';
import { Clients } from './models/sign-up-clients.model';

@Injectable()
export class SignUpService {

  private client: Clients;
  private cuit: string;
  private captchaToken: string;

  getToken() {
    return this.captchaToken;
  }

  setToken(data: any) {
    this.captchaToken = data;
  }

  getClient() {
    return this.client;
  }

  setClient(client: Clients) {
    this.client = client;
  }

  getCuit() {
    return this.cuit;
  }

  setCuit(cuit: string) {
    this.cuit = cuit;
  }
}
