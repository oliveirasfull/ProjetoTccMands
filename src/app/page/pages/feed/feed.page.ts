import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUser, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  public pro : string = "Pro"
  user : Observable<any>

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUsers();
    
  }

}
