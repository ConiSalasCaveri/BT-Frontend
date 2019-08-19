import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable()
export class SubcategoryService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getSubcategories(categoryId: string) {
    return this.httpClient.get<any>('./assets/data/subcategory.json');
  }
}
