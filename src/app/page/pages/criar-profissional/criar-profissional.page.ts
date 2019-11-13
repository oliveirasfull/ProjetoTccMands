import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page'

@Component({
  selector: 'app-criar-profissional',
  templateUrl: './criar-profissional.page.html',
  styleUrls: ['./criar-profissional.page.scss'],
})
export class CriarProfissionalPage implements OnInit {

  tipoUser: TypeUser;
  pro: TypePro = {
    nomePro: '',
    descricaoServico: '',
    atendimentoDomicilio: false,
    manicure: false,
    precoManicure: 0,
    pedicure: false,
    precoPedicure: 0,
    classificacao: 0,
    idade: 0
  };

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private toastCtrl: ToastController, private tabs: TabsPage) {
    
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.userService.getUsers().subscribe(usuario => {
        for (let x = 0; x < usuario.length; x++) {
          if (usuario[x].email == user.email) {
            this.tipoUser = { nome: usuario[x].nome, email: usuario[x].email, profissionalAtivo: usuario[x].profissionalAtivo, id: usuario[x].id };
            console.log(this.tipoUser);
            break;
          }
        }
      });
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


  addPro() {
    let user = this.tabs.getUser()
    
    this.tipoUser = {nome: user.nome, email: user.email, profissionalAtivo: user.profissionalAtivo};

    this.userService.updateUserToPro(this.tipoUser, this.pro).then(() => {
      this.showToast('Realizado Update');

    }).catch(e => { console.log(e) });
    
  }


}
