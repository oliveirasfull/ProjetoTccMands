import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService, Agendamento } from 'src/app/service/agendamento/agendamento.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {

  dados: any;
  date: string;
  hora: string;
  descricao : string;
  atendimentoDomicilio: boolean = false;
  pedicure: boolean = false;
  manicure: boolean = false;

  constructor(private route: ActivatedRoute, private agendamentoService: AgendamentoService, private toastCtrl: ToastController) { 
    this.route.queryParams.subscribe(params =>{
      if (params && params.special){
        this.dados = JSON.parse(params.special);
        console.log(this.dados);
      }
    });

  }

  ngOnInit() {
  }

  onSubmit(){
    let tipoAgendamento: Agendamento = {
      data : this.date,
      hora : this.hora,
      descricao : this.descricao,
      idProfissional : this.dados.idProdissional,
      idUsuario : this.dados.idUser,
      atendimentoDomicilio: this.atendimentoDomicilio,
      pedicure: this.pedicure,
      manicure: this.manicure,
      confirmacao: true
    };

    this.agendamentoService.addAgendamento(tipoAgendamento).then(() => {
      this.showToast('Agendamento realizado');
    }).catch(e => {console.log(e)});
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
