import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
        CoreModule, 
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule],

  bootstrap: [AppComponent]
})
export class AppModule {}
