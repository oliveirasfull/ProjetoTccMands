import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Agendamento, AgendamentoService } from 'src/app/service/agendamento/agendamento.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
})
export class NotificacoesPage implements OnInit {

  agendamento: Agendamento[] = [];
  data: any;


  constructor(private route: ActivatedRoute, private router: Router,
    private agendamentoService: AgendamentoService, private alertController: AlertController,
    @Inject(LOCALE_ID) private locale: string, private toastCtrl: ToastController,
    private tabs: TabsPage) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log(this.data);
        this.agendamento = this.tabs.getAgendamentoByKeyPro(this.data.id);
        console.log(this.agendamento);
      }
    });
  }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }



  async confirmarAgendamento(agen: Agendamento) {
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

  concelarAgendamento(agen: Agendamento) {
    this.agendamentoService.confirmarAgendamento(agen).catch(e => {
      console.log(e);
    });
  }

  aprovarAgendamento(agen: Agendamento) {
    this.agendamentoService.confirmarAgendamento(agen).catch(e => {
      console.log(e);
    }).then(() => {
      this.showToast('confirmado');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
