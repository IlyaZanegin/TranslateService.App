import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILanguage, ITranslateResponse, ITranslateRequest } from '@models';
import { URL_CONFIG, IUrlConfig } from '@config/url';
import { HandleService } from '../handle/handle.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslateService extends HandleService  {
  private readonly baseUrl: string;
  private readonly headers: any;

  //folderId и iamToken - это секретная информация, она не должна быть здесь
  //Нужно использовать API, тогда мы сможем вызвать powershell scipt на сервере, который вернет нам токен 
  //Токен живет не более 12 часов
  //Это Yandex Cloud
  private readonly folderId = 'b1gro9mj3edpr88556ul';
  private readonly iamToken = 't1.9euelZqSx5nJko-MnpuYi5Ccns2Nx-3rnpWaxpORkZaNns3PkJ3Nj46Zlcvl8_dzeUp8-e8HECdE_d3z9zMoSHz57wcQJ0T9.-EegtwxknQKQWuUcEJRVNVtXjNwjxCgtsS-2CJuebET0yaKEjivRfjkslAl8Fm3OAQekYyegv6gNrLLtEVkTCg';

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(URL_CONFIG) urlConfig: IUrlConfig) {
    super();
    this.baseUrl = urlConfig.cloudTranslateUrl;
    this.headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.iamToken}`
      })
    };   
  }

  getLanguageList(): Observable<ILanguage[]> {
    const body = {
      folderId: this.folderId
    };

    return this.httpClient.post(`${this.baseUrl}languages`, body, this.headers).pipe(map(response => {
      const languages = response["languages"];

      return languages.map(function (language: ILanguage) {
         return { code: language.code, name: language.name };
      }).filter(x => x.name != null);
    }), catchError(this.errorHandle));
  }

  translate(sourceLang: ILanguage, targetLang: ILanguage, sourceText: string): Observable<ITranslateResponse[]> {
    const body: ITranslateRequest = {
      sourceLanguageCode: sourceLang.code,
      targetLanguageCode: targetLang.code,
      format: 'PLAIN_TEXT',
      texts: sourceText.split('\n').map(x => x.trim()),
      folderId: this.folderId,
      model: null,
      glossaryConfig: null
    };

    return this.httpClient.post(`${this.baseUrl}translate`, body, this.headers).pipe(map(response => {
      const translations = response["translations"];

      return translations.map(function (translate: ITranslateResponse) {
        return { text: translate.text };
      });
    }), catchError(this.errorHandle));
  }
}
