
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
 { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoteamentoPaginasRoutingModule { }
