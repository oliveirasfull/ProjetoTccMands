import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgCalendarModule } from 'ionic2-calendar';

import { Routes, RouterModule } from '@angular/router';

import { AgendamentoPage } from './agendamento.page';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr)

const routes: Routes = [
  {
    path: '',
    component: AgendamentoPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  declarations: [AgendamentoPage],
  providers:[
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class AgendamentoPageModule {}
