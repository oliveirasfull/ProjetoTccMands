import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

<<<<<<< HEAD
import { FCM } from '@ionic-native/fcm';
import { Push } from '@ionic-native/push';

=======
>>>>>>> parent of 088a29e... Teste
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
        CoreModule, 
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],

  bootstrap: [AppComponent]
})
export class AppModule {}
