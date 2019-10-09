

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';



const routes: Routes = [
  {
    path:'',
   canActivateChild: [AuthGuard], // bloqueia todas as URL
    children:[
      {
        path:'',
        loadChildren:'./pages/usuario/usuario.module#UsuarioPageModule'
      }
      
    ]
  },
 { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' },
  { path: 'profissional', loadChildren: './pages/profissional/profissional.module#ProfissionalPageModule' },
  { path: 'criacao-do-profissional', loadChildren: './pages/criacao-do-profissional/criacao-do-profissional.module#CriacaoDoProfissionalPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' }


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoteamentoPaginasRoutingModule { }
