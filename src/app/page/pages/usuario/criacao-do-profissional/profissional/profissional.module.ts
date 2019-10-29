import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { ProfissionalPage } from './profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalPage
  }
];

@NgModule({
  imports: [
   SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfissionalPage]
})
export class ProfissionalPageModule {}
