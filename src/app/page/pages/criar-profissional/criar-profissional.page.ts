import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criar-profissional',
  templateUrl: './criar-profissional.page.html',
  styleUrls: ['./criar-profissional.page.scss'],
})
export class CriarProfissionalPage implements OnInit {

  tipoUser: any;
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

  constructor(private afAuth: AngularFireAuth, private userService: UserService, 
    private toastCtrl: ToastController, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params =>{
        if (params && params.special){
          this.tipoUser = JSON.parse(params.special);
          console.log(this.tipoUser);
        }
      });
    
  }

  ngOnInit() {
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


  addPro() {

    this.userService.updateUserToPro(this.tipoUser, this.pro).then(() => {
      this.showToast('Realizado Update');

    }).catch(e => { console.log(e) });
    
  }


}
