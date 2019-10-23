import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ProfissionalPage } from './profissional.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { avaliacaoComponent } from './avaliacao/avaliacao.component';
import { perfilProfissionalComponent } from './perfil/perfil.component';



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
  declarations: [ProfissionalPage, avaliacaoComponent, perfilProfissionalComponent ]
})
export class ProfissionalPageModule {}
