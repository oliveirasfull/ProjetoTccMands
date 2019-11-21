import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { NotificacoesPage } from './notificacoes.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacoesPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificacoesPage]
})
export class NotificacoesPageModule {}
