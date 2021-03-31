import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '@components';
import { ListTranslateComponent, AddTranslateComponent } from '@pages';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: ListTranslateComponent
      },
      {
        path: 'list',
        component: ListTranslateComponent
      },
      {
        path: 'add',
        component: AddTranslateComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'list'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
