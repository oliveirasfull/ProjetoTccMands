import { Component, OnInit, Inject } from '@angular/core';
import { Agendamento, AgendamentoService } from 'src/app/service/agendamento/agendamento.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
})
export class NotificacoesPage implements OnInit {
  agendamento: Agendamento[] = [];
  
  
  constructor(private route: ActivatedRoute, private router: Router, private tabs: TabsPage,
    private agendamentoService: AgendamentoService, private alertController: AlertController,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
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