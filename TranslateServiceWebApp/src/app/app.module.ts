import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, NotificationComponent } from '@components';
import { ShellModule, AppRoutingModule } from '@modules';

@NgModule({
  declarations: [
    AppComponent, NotificationComponent
  ],
  imports: [
    BrowserModule,
    ShellModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
