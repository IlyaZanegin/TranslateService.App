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
  private readonly iamToken = 't1.9euelZqOjJ2RjYyQmY7Pj8-dmJGSie3rnpWaxpORkZaNns3PkJ3Nj46Zlcvl9PcScmh8-e8nOQqP3fT3UiBmfPnvJzkKjw.9mEGjzcXIZoA2cjX7tjD12SMhJ8TwTK-XF9AlI4ppQt-RzEZu7JTaodji_B_Ta83VoWwWp7DH0LuzcP2jBQaDw'

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
        return { code: language.code, age: language.name };
      });
    }), catchError(this.errorHandle));
  }
}
