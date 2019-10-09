import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioPage]
})
export class UsuarioPageModule {}
