

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
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' }, 
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' },
  { path: 'profissional', loadChildren: './pages/profissional/profissional.module#ProfissionalPageModule' },
  { path: 'criar-profissional', loadChildren: './pages/criar-profissional/criar-profissional.module#CriarProfissionalPageModule' },
  { path: 'agendamento', loadChildren: './pages/profissional/agendamento/agendamento.module#AgendamentoPageModule' },  { path: 'calendario', loadChildren: './pages/calendario/calendario.module#CalendarioPageModule' },
  { path: 'notificacoes', loadChildren: './pages/notificacoes/notificacoes.module#NotificacoesPageModule' }






 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoteamentoPaginasRoutingModule { }
