import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public pro : string = "Pro"
  user : Observable<any>

  constructor( private userService: UserService, private router: Router, 
    private afAuth: AngularFireAuth, private localNotifications: LocalNotifications,
    private plt: Platform) {
      this.plt.ready().then(() => {
        this.localNotifications.on('trigger').subscribe(res =>{
          
        });
      });
    }

  
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
