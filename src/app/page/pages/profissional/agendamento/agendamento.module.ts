import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';



import { AgendamentoPage } from './agendamento.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgendamentoPage]
})
export class AgendamentoPageModule {}
