import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent, HeaderLayoutComponent, FooterLayoutComponent } from '@components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  declarations: [
    ShellComponent, HeaderLayoutComponent, FooterLayoutComponent
  ]
})
export class ShellModule { }
