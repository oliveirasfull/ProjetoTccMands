import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUser, UserService } from 'src/app/service/user.service';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public pro : string = "Pro"
  user : Observable<any>

  constructor( private userService: UserService, private navCtrl: NavController, private router: Router, private afAuth: AngularFireAuth) { }

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
