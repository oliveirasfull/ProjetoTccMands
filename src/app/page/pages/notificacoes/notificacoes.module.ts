import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule, LOCALE_ID } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { NotificacoesPage } from './notificacoes.page';
import { TabsPage } from '../tabs/tabs.page';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr)

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
  declarations: [NotificacoesPage],
  providers: [ TabsPage, { provide: LOCALE_ID, useValue: 'pt-BR' } ]
})
export class NotificacoesPageModule {}
