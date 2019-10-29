

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../page/pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
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
 { path: 'feed', loadChildren: './pages/usuario/criacao-do-profissional/profissional/feed/feed.module#FeedPageModule' },
  { path: 'profissional', loadChildren: './pages/usuario/criacao-do-profissional/profissional/profissional.module#ProfissionalPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'criacao-do-profissional', loadChildren: './pages/usuario/criacao-do-profissional/criacao-do-profissional.module#CriacaoDoProfissionalPageModule' }



 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoteamentoPaginasRoutingModule { }
