import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'usuario', loadChildren: './page/roteamento-paginas.module#RoteamentoPaginasModule',
   canLoad: [AuthGuard]// com isso a pagina nao sera baixada
  }  
  
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
