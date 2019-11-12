
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

  
  constructor(private userService: UserService, private toastCtrl: ToastController) { 
    
    
    /*
    Está etapa foi usada para pegar um registro dentro do banco e transferir para uma variavel,
    pois as variavel do tipo 'Observable' não permite mecher dentro dele dentro do typescript, mas deixa 
    mexer no HTML.
    Caso dejese adicionar um registro deixa essa parte Comentada, se não encontre na base de dado um registro
    de interesse e copia a chave e coloca no 'if(vetor[x].id === KEY)' para encotrar o registro e ser utilizado
    para teste.
    */  
   /*
   this.userService.getUsers().forEach( vetor =>{
     for (let x = 0; x < vetor.length; x++){
       if(vetor[x].id === 'ihaMFeZwyD5FQC61LMe0'){
         this.vetor = { id: vetor[x].id, nome: vetor[x].nome, email: vetor[x].email, tipo: vetor[x].tipo};
        }
      }
    });
    */
   
   
  } 
  
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
   
                         
}                
}
            