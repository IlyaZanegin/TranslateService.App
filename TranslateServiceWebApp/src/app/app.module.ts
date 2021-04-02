import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, NotificationComponent } from '@components';
import { ShellModule, AppRoutingModule } from '@modules';
import { HttpClientModule } from '@angular/common/http';
import { URL_CONFIG } from '@config/url';
import { UrlConfig } from 'environments/environment';
import { AddTranslateComponent, ListTranslateComponent } from '@pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, NotificationComponent, AddTranslateComponent, ListTranslateComponent
  ],
  imports: [
    BrowserModule,
    ShellModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: URL_CONFIG, useValue: UrlConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
