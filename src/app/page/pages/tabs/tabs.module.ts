import { FeedPageModule } from './../feed/feed.module';
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
      }
    ]
  },
  {
    path:'usuario',
    component:TabsPage,
    children:[
      {
        path:'',
        loadChildren:()=>
          import ("../usuario/usuario.module").then(m=> m.UsuarioPageModule)
      }
    ]

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
