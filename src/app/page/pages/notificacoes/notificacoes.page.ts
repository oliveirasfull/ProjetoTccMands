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
  teste: Date;


  constructor(private route: ActivatedRoute, private router: Router,
    private agendamentoService: AgendamentoService, private alertController: AlertController,
    @Inject(LOCALE_ID) private locale: string, private toastCtrl: ToastController,
    private tabs: TabsPage) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log(this.data);
        if (this.data.profissionalAtivo) {
          this.agendamento = this.tabs.getAgendamentoByKeyPro(this.data.id);
        } else {
          this.agendamento = this.tabs.getAgendamentoByKeyUser(this.data.id);
        }

        console.log(this.agendamento);
      }
    });
  }


  async confirmarAgendamento(agen: Agendamento) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Confirme o  <strong>Agendamento</strong>!!!',
      buttons: [
        {
          text: 'Sair',
          role: 'cancel',
          cssClass: 'btn btn-danger',
          handler: (blah) => {
            console.log(blah)
          }
        }, {
          text: 'Confirmar',
          cssClass: 'btn btn-success',
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

  async cancelarAgen(agen: Agendamento) {
    const alert = await this.alertController.create({
      header: 'Tem Certeza que quer Cancelar este Agendamento?',
      message: 'Digite o Motivo do Cancelamento',
      inputs: [
        {
          name: 'descricaoCancel',
          type: 'text',
          placeholder: 'Digite aqui o motivo'
        }
      ],
      buttons: [
        {
          text: 'Sair',
          role: 'cancel',
          cssClass: 'btn-primary',
          handler: (blah) => {
            console.log(blah)
          }
        }, {
          text: 'OK',
          cssClass: 'btn-danger',
          handler: blah => {
            agen.pendente = false;
            agen.descricaoCancelamento = blah.descricaoCancel;
            this.concelarAgendamento(agen);
          }
        }
        
      ]
    });

    await alert.present();
  }

  concelarAgendamento(agen: Agendamento) {
    this.agendamentoService.confirmarAgendamento(agen).catch(e => {
      console.log(e);
    }).then(() => {
      this.showToast('Cancelado');
    });

    this.router.navigate(['./usuario/feed']);
  }

  aprovarAgendamento(agen: Agendamento) {
    this.agendamentoService.confirmarAgendamento(agen).catch(e => {
      console.log(e);
    }).then(() => {
      this.showToast('confirmado');
    });

    this.router.navigate(['./usuario/feed']);
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
