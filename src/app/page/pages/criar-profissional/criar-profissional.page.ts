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
  horarioManha : any [];
  horarioTarde : any [];
  horarioNoite: any [];
  diasDaSemana: any [];
  tipoUser: any;
  pro: TypePro = {
    nomePro: '',
    descricaoServico: '',
    atendimentoDomicilio: false,
    manicure: false,
    precoManicure: null,
    pedicure: false,
    cabelo: false,
    maquiagem: false,
    precoPedicure: null,
    classificacao: 0,
    idade: null,
    precoCabelo : null,
    precoMaquiagem: null,
    horarioManhaPro : [],
    horarioTardePro : [],
    horarioNoitePro : [],
    diaDaSemanaPro : [],
  };
  manha: any[] = [
    {
      hora: '6:00AM'
    },
    {
      
      hora: '7:00AM'
     
    },
    {
      
      hora: '8:00AM'
     
    },
    {
      
      hora: '9:00AM'
     
    },
    {
      
      hora: '10:00AM'
     
    },
    {
      
      hora: '11:00AM'
     
    },
    {
      
      hora: '12:00AM'
     
    }
  ];
  tarde: any[] = [
    {
      hora: '13:00AM'
    },
    {
      hora: '14:00AM'
    },
    {
      hora: '15:00AM'
    },
    {
      hora: '16:00AM'
    },
    {
      hora: '17:00AM'
    },
    {
      hora: '18:00AM'
    },
  ];
  noite: any[] = [
    {
      hora: '19:00AM'
    },
    {
      hora: '20:00AM'
    },
    {
      hora: '21:00AM'
    },
    {
      hora: '22:00AM'
    },
  ];
  dias: any[] = [
    {
      dia: 'Segunda-Feira'
    },
    {
      dia: 'Terça-Feira'
    },
    {
      dia: 'Quarta-Feira'
    },
    {
      dia: 'Quinta-Feira'
    },
    {
      dia: 'Sexta-feira'
    },
    {
      dia: 'Sabado'
    },
    {
      dia: 'Domingo'
    },
  ];


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
