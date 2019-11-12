
import { Component, OnInit } from '@angular/core';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  vetor: any;
  data: any;

  
  
  constructor(private userService: UserService, private toastCtrl: ToastController, private afAuth: AngularFireAuth) { 

  } 
  public titulo :string = 'Mands'

  ngOnInit() {    
    this.afAuth.authState.subscribe(user => {
      this.userService.getUsers().subscribe(usuario => {
        for (let x = 0; x < usuario.length; x++) {
          if (usuario[x].email == user.email) {
            this.vetor = { nome: usuario[x].nome, email: usuario[x].email, profissionalAtivo: usuario[x].profissionalAtivo, id: usuario[x].id };
            console.log(this.vetor);
            break;
          }
        }
      });
    }); 
  }
                         
}                
     
            