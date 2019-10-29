import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { CriacaoDoProfissionalPage } from './criacao-do-profissional.page';

const routes: Routes = [
  {
    path: '',
    component: CriacaoDoProfissionalPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriacaoDoProfissionalPage]
})
export class CriacaoDoProfissionalPageModule {}
