import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, NotificationComponent } from '@components';
import { ShellModule, AppRoutingModule } from '@modules';
import { HttpClientModule } from '@angular/common/http';
import { URL_CONFIG } from '@config/url';
import { UrlConfig } from 'environments/environment';

@NgModule({
  declarations: [
    AppComponent, NotificationComponent
  ],
  imports: [
    BrowserModule,
    ShellModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: URL_CONFIG, useValue: UrlConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
