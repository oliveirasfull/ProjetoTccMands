import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page'
import { Agendamento, AgendamentoService } from 'src/app/service/agendamento/agendamento.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {
  public coracaoCheio: string = "../../../../assets/icon/estrelaCheia.png"
  data: any;
  agendamento: Agendamento[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private tabs: TabsPage,
    private agendamentoService: AgendamentoService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log(this.data);
      } else {
        if (this.data == null) {
          this.data = this.tabs.getUser();
          console.log(this.data);
          this.agendamento = this.tabs.getAgendamentoByKeyPro(this.data.id);
          console.log(this.agendamento);
        }
      }
    });
  }


  exibeAvaliacao() {
    this.coracaoCheio

  }

  irParaAgendamento() {
    let user = {idProdissional: this.data.id, idUser: this.tabs.user.id, nomeUser: this.tabs.user.nome}
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(user)
      }
    };
    this.router.navigate(['./usuario/agendamento'], navigateExtras);
  }

  doRefresh(event){
    console.log('Começou');

    setTimeout(() =>{
      console.log('Operação a caminho');
      event.target.complete()
    });
  }

  async confirmarAgendamento(agen: Agendamento){
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Confirme o  <strong>Agendamento</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            agen.pendente = false;
            this.concelarAgendamento(agen);
          }
        }, {
          text: 'Okay',
          handler: () => {
            agen.confirmacao = true;
            agen.pendente = false;
            this.aprovarAgendamento(agen);
          }
        }
      ]
    });

    await alert.present();
  }

  concelarAgendamento(agen: Agendamento){
    this.agendamentoService.confirmarAgendamento(agen).catch(e => {
      console.log(e);
    });
  }

  aprovarAgendamento(agen: Agendamento){
    this.agendamentoService.confirmarAgendamento(agen).catch(e => {
      console.log(e);
    });;
  }

}
