
import { Component, OnInit } from '@angular/core';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  //Variavel que guarda as informações do usuario
  idea: TypeUser = {
    nome: 'Mayara',
    email: 'exemplo@gmail',
    profissionalAtivo: false
    
  };
  
  //Variavel que guarda as informações do profissional
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

  //Variavel que guarda o usuario que vai ser utilizado para fazer o update para o profissional
  vetor: TypeUser;
  data: any;

  //public profissional : boolean =  true // responsavel por definir ser o usuario e profisional ou nao nas regras de template
  
  
  constructor(private userService: UserService, private toastCtrl: ToastController, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params =>{
      if(params && params.special ){
        this.data = JSON.parse(params.special);
      }
    });
  } 
  public nomeUser: string = this.idea.nome
  public titulo :string = 'Mands'

  ngOnInit() {       
  }
  
  addUser() {
    
    /* 
      Função que Torna o Usuário comum para Profissional.
      Requisito: Pegar um registro existente.
      Para Utilizar: 
        1-Primeiro precisa de uma variavel do tipo 'TypeUser' com as informações do usuário que deseja atualizar;
        2-Segundo precisa de uma variavel do tipo 'TypePro' com as informações.
     */
    /*
    this.userService.updateUserToPro(this.vetor, this.pro).then(() => {
      this.showToast('Realizado Update');
    });
    */

    /*
     Função que adicionar um usuario.
     Requisito: Ter uma variavel com as informações.
     Para Utilizar:
      1-Primeiro precisa de uma variavel do tipo 'TypeUser' com as informações do usuario.
    */
    this.userService.addUser(this.idea).then(() => {
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    }).catch((e) => { console.error(e) });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
                         
}                
     
            