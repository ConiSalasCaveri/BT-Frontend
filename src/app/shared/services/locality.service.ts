import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalityService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getLocalities(localityId: string) {
    return this.httpClient.get<any>('./assets/data/localities.json');
  }

  getLocality(localityId: number) {
    return this.httpClient.get<any>('./assets/data/onelocality.json');
  }
}
