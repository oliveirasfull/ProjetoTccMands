import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { UsuarioPage } from './usuario.page';
import { fotoComponent } from './foto/foto.component';
import { perfilComponent } from './perfil/perfil.component';

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
  declarations: [UsuarioPage, fotoComponent, perfilComponent]
})
export class UsuarioPageModule {}
