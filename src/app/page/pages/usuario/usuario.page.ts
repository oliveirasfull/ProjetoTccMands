import { Component, OnInit } from '@angular/core';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  idea: TypeUser = {
    nome: '',
    email: '',
    tipo : ''
  };

  pro: TypePro = {
    nomePro: 'Fulano',
    atendimentoDomicilio: false,
    manicure: false,
    precoManicure: 100,
    pedicure: false,
    precoPedicure: 200,
    classificacao: 8.5,
    idade: 35
  };

  vetor: TypeUser;

  //public titulo :string = 'Mands'
  //public profissional : boolean =  true // responsavel por definir ser o usuario e profisional ou nao nas regras de template


  constructor(private userService: UserService, private toastCtrl: ToastController) { 
      this.userService.getUsers().forEach( vetor =>{
        for (let x = 0; x < vetor.length; x++){
          if(vetor[x].id === 'ihaMFeZwyD5FQC61LMe0'){
          this.vetor = { id: vetor[x].id, nome: vetor[x].nome, email: vetor[x].email, tipo: vetor[x].tipo};
          }
        }
      });
  } 

  ngOnInit() {       
  }
  
  addUser() {
    this.userService.updateUserToPro(this.vetor, this.pro).then(() => {
      this.showToast('Realizado Update');
    });
    /*this.userService.addUser(this.idea).then(() => {
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    }).catch((e) => { console.error(e) });*/
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
                         
}                     
     
            