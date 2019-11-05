import { Component, OnInit } from '@angular/core';
import { UserService, TypeUser } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  idea: TypeUser = {
    nome: '',
    email: '',
    tipo : 'Usuario'
  };

  public titulo :string = 'Mands'
  public profissional : boolean =  true // responsavel por definir ser o usuario e profisional ou nao nas regras de template


  constructor(private userService: UserService, private toastCtrl: ToastController) { } 

  ngOnInit() {       
  }
  
  addIdea() {
    this.userService.addUser(this.idea).then(() => {
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
                         
}                     
     
            