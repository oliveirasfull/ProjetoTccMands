import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children :[
      {
        path:'feed',
        children :[
          {
            path:'',
            loadChildren:() =>
              import ('../feed/feed.module').then(m=> m.FeedPageModule)
          }
        ]
      },
    {
      path:'usuario',
      
      children:[
        {
         path:'',
         loadChildren:()=>
           import ("../usuario/usuario.module").then(m=> m.UsuarioPageModule)
        }
       ]
      },
      {
        path:'profissional',
          
        children:[
          {
           path:'',
           loadChildren:()=>
             import ("../profissional/profissional.module").then(m=> m.ProfissionalPageModule)
          }
         ]
        },
        {
          path:'notificacoes',
            
          children:[
            {
             path:'',
             loadChildren:()=>
               import ("../notificacoes/notificacoes.module").then(m=> m.NotificacoesPageModule)
            }
           ]
          },
          {
            path:'agendamento',
              
            children:[
              {
               path:'',
               loadChildren:()=>
                 import ("../profissional/agendamento/agendamento.module").then(m=> m.AgendamentoPageModule)
              }
             ]
            },
        
    {
      path:'',
      redirectTo:'usuario',
      pathMatch:'full'
    }
  ]
  },
  {
    path:'',
    redirectTo:'usuario',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
