import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { FeedPage } from './feed.page';

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeedPage]
})
export class FeedPageModule {}
