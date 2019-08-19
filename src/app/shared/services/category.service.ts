import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable()
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getCategories() {
    return this.httpClient.get<any>('./assets/data/category.json');
  }
}
