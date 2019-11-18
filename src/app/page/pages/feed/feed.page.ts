import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUser, UserService } from 'src/app/service/user.service';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
<<<<<<< HEAD
import { FCM } from '@ionic-native/fcm';
import { AlertController } from '@ionic/angular';
=======
>>>>>>> parent of 088a29e... Teste

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public pro : string = "Pro"
  user : Observable<any>

<<<<<<< HEAD
  constructor( private userService: UserService, private navCtrl: NavController, private router: Router, 
    private afAuth: AngularFireAuth, private fcm: FCM, private alertController: AlertController) { }

  async confirmarAgendamento(){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
=======
  constructor( private userService: UserService, private navCtrl: NavController, private router: Router, private afAuth: AngularFireAuth) { }
>>>>>>> parent of 088a29e... Teste

  ngOnInit() {
    this.user = this.userService.getUsers();
    
  }

  paginaProfissional(item: any){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(item)
      }
    };
    this.router.navigate(['./usuario/profissional'], navigateExtras);
  }

  getUserByEmail(){
    let usuario: any;
    this.afAuth.authState.subscribe(user => {
      this.user.subscribe(contUser => {
        for (let x = 0; x < contUser.length; x++) {
          if (contUser[x].email == user.email) {
            usuario = contUser[x].email;
            console.log(usuario);
            return usuario;
          }
        }
      });
    });
  }

}
