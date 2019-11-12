import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public profissional : boolean // responsavel por definir ser o usuario e profisional ou nao nas regras de template

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.userService.getUsers().subscribe(usuario => {
        for (let x = 0; x < usuario.length; x++) {
          if (usuario[x].email == user.email) {
            this.profissional = usuario[x].profissionalAtivo;
            break;
          }
        }
      });
    });
  }

}
