import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable()
export class ProvinceService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getProvinces() {
    return this.httpClient.get<any>('./assets/data/province.json');
  }

  getProvince(provinceId: number) {
    return this.httpClient.get<any>('./assets/data/oneprovince.json');
  }
}
