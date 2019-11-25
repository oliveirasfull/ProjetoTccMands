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
      
      hora: 6
    },
    {
      
      hora: 7
     
    },
    {
      
      hora: 8
     
    },
    {
      
      hora: 9
     
    },
    {
      
      hora: 10
     
    },
    {
      
      hora: 11
     
    },
    {
      
      hora: 12
     
    }
  ];
  tarde: any[] = [
    {
      hora: 13
    },
    {
      hora: 14
    },
    {
      hora: 15
    },
    {
      hora: 16
    },
    {
      hora: 17
    },
    {
      hora: 18
    },
  ];
  noite: any[] = [
    {
      hora: 19
    },
    {
      hora: 20
    },
    {
      hora: 21
    },
    {
      hora: 22
    },
  ];
  dias: any[] = [
    {
      
      dia : 'Domingo'
    },
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
  hora(){
    console.log(this.pro.diaDaSemanaPro)
  }
  
  


}
