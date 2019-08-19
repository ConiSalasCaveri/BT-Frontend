import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UnitService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getUnits() {
    return this.httpClient.get<any>('./assets/data/unit.json');
  }
}
