import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUser, UserService } from 'src/app/service/user/user.service';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public pro : string = "Pro"
  user : Observable<any>

  constructor( private userService: UserService, private navCtrl: NavController, private router: Router) { }

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

}
