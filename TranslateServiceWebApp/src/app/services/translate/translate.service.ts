import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ILanguage } from '@models';
import { URL_CONFIG, IUrlConfig } from '@config/url';
import { HandleService } from '../handle/handle.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslateService extends HandleService  {
  private readonly baseUrl: string;
  private readonly headers: any;
  private readonly body: any;

  //folderId и iamToken - это секретная информация, она не должна быть здесь
  //Нужно использовать API, тогда мы сможем вызвать powershell scipt на сервере, который вернет нам токен 
  //Токен живет не более 12 часов
  //Это Yandex Cloud
  private readonly folderId = 'b1gro9mj3edpr88556ul';
  private readonly iamToken = 't1.9euelZqNycaJmsjHjY7HiYyXy5bLl-3rnpWaxpORkZaNns3PkJ3Nj46Zlcvl8_cHUWR8-e8fP3xk_t3z90d_YXz57x8_fGT-.5V6SNaCxWUV3DKLGFJUpD7FPMSXKneaau-LSkIf5nYPfkg3CR4VqMDotqUTGo9q8L40ZiWOqAetoTZ2VcEPHDQ';

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
    this.body = {
      folderId: this.folderId
    };
  }

  getLanguageList(): Observable<ILanguage[]> {
    return this.httpClient.post(`${this.baseUrl}languages`, this.body, this.headers).pipe(map(response => {
      let languages = response["languages"];

      return languages.map(function (language: ILanguage) {
        return { code: language.code, name: language.name };
      });
    }), catchError(this.errorHandle));
  }
}
