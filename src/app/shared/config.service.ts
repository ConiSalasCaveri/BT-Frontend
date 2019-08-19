import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
    private config: any;
    private loaded = false;

    constructor(private http: HttpClient) { }

    load(): Promise<any> {
        // PLEASE SEE:
        // https://github.com/natchiketa/angular-cli-envvars/issues/1
        // https://embed.plnkr.co/295SxTOZEZUbiyrhAKh2/
        // https://github.com/angular/angular/issues/9047
        let rt: Promise<any>;
        if (!this.loaded) {
            const promise = new Promise<any>(resolve => {
                this.http.get('./assets/appsettings.json').subscribe(config => {
                    this.config = config;
                    this.loaded = true;
                    console.log(this.config);
                    resolve(this.config);
                });

            });
            rt = promise;
        }
        return rt;
    }

    public getProperty(property: string): any {
        return this.config[property];
    }
}
