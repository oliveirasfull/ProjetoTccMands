import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService, Agendamento } from 'src/app/service/agendamento/agendamento.service';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {

  dados: any = '';
  date: Date;
  descricao: string = '';
  atendimentoDomicilio: boolean = false;
  pedicure: boolean = false;
  manicure: boolean = false;
  vetorAgendamento: any[] = [];
  cont = 0;
  contbo = false;
  DiaDaSemana: string[] = [' Domingo', ' Segunda-Feira', ' Terça-Feira', ' Quarta-Feira', ' Quinta-Feira', ' Sexta-feira', ' Sabado'];
  vetorDiaDaSemana: number[] = [];
  double = false;

  minDate = new Date().toISOString();

  event = {
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  };

  tipoDeCalendar = 'month';

  eventSource = [];

  calendar = {
    mode: this.tipoDeCalendar,
    currentDate: new Date(),
    locale: this.locale
  };
  viewTitle = '';

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(private route: ActivatedRoute,
    private agendamentoService: AgendamentoService, private toastCtrl: ToastController,
    private userService: UserService, @Inject(LOCALE_ID) private locale: string) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.dados = JSON.parse(params.special);
        this.preencherVetorDiaSemana();
        console.log(this.vetorDiaDaSemana);
        console.log(this.dados);

        this.agendamentoService.getAgendamento().subscribe(agen => {
          agen.forEach(element => {
            if (element.idProfissional == this.dados.idProfissional) {

              let eventCopy = {
                title: element.descricao,
                desc: element.descricao,
                startTime: new Date(element.dataHora),
                endTime: new Date(Date.UTC(element.dataHora.getFullYear(), element.dataHora.getMonth(),
                  element.dataHora.getDate(), element.dataHora.getHours() + 1)),
                AllDay: false
              }

              this.eventSource.push(eventCopy);
            }

          });

        });

      }
    });

  }

  ngOnInit() {
    console.log(this.event.startTime)
  }

  preencherVetorDiaSemana() {
    for (let x = 0; x < this.DiaDaSemana.length; x++) {
      for (let i = 0; i < this.dados.pro.diaDaSemanaPro.length; i++) {

        if (this.DiaDaSemana[x] == this.dados.pro.diaDaSemanaPro[i]) {
          this.vetorDiaDaSemana.push(x);
        }

      }

    }
  }

  preencherCalendar(startTime: Date) {

    this.eventSource = [];

    let diaOcupado = true;

    for (let x = 0; x < this.vetorDiaDaSemana.length; x++) {
      console.log('Mes = ' + startTime.getMonth())
      if (startTime.getDay() == this.vetorDiaDaSemana[x]) {
        diaOcupado = false;
      }
    }

    if (diaOcupado) {
      this.inserirDiaOcupado(startTime);
    }

    // ----------------------MANHA--------------------------
    if (this.dados.pro.horarioManhaPro.length != 0 && this.dados.pro.horarioManhaPro != undefined && diaOcupado == false) {

      for (let x = 6; x <= 12; x++) {

        let eventoOcupado = true;

        for (let i = 0; i < this.dados.pro.horarioManhaPro.length; i++) {

          let texto = this.dados.pro.horarioManhaPro[i].split(':');
          let horario = parseInt(texto[0]);


          if (x == horario) {
            eventoOcupado = false;
          }

        }

        if (eventoOcupado) {
          this.inserirEventoOcupado(x, startTime);
        }

      }
    }

    //----------------------------TARDE----------------------

    if (this.dados.pro.horarioTardePro.length != 0 && this.dados.pro.horarioManhaPro != undefined && diaOcupado == false) {

      for (let x = 13; x <= 18; x++) {

        let eventoOcupado = true;

        for (let i = 0; i < this.dados.pro.horarioTardePro.length; i++) {

          let texto = this.dados.pro.horarioTardePro[i].split(':');
          let horario = parseInt(texto[0]);

          if (x == horario) {
            eventoOcupado = false;
          }

        }

        if (eventoOcupado) {
          this.inserirEventoOcupado(x, startTime);
        }

      }
    }

    //--------------------NOITE----------------------

    if (this.dados.pro.horarioNoitePro.length != 0 && this.dados.pro.horarioManhaPro != undefined && diaOcupado == false) {

      for (let x = 19; x <= 22; x++) {

        let eventoOcupado = true;

        for (let i = 0; i < this.dados.pro.horarioNoitePro.length; i++) {

          let texto = this.dados.pro.horarioNoitePro[i].split(':');
          let horario = parseInt(texto[0]);


          if (x == horario) {
            eventoOcupado = false;
          }

        }

        if (eventoOcupado) {
          this.inserirEventoOcupado(x, startTime);
        }

      }
    }

  }

  inserirEventoOcupado(horario: number, time: Date) {

    let eventCopy: any = '';


    eventCopy = {
      title: 'INDISPONIVEL',
      desc: 'OCUPADO',
      startTime: new Date(Date.UTC(time.getFullYear(), time.getMonth(), time.getDate(), horario + 5)),
      endTime: new Date(Date.UTC(time.getFullYear(), time.getMonth(), time.getDate(), horario + 6)),
      allDay: false
    };

    this.eventSource.push(eventCopy);
  }

  inserirDiaOcupado(time: Date) {
    let eventCopy = {
      title: 'Dia INDISPONIVEL',
      desc: 'Dia OCUPADO',
      startTime: new Date(Date.UTC(time.getFullYear(), time.getMonth(), time.getDate(), 0 - 5)),
      endTime: new Date(Date.UTC(time.getFullYear(), time.getMonth(), time.getDate(), 23 + 5)),
      allDay: false
    };

    this.eventSource.push(eventCopy);
  }

  onSubmit() {
    let tipoAgendamento: Agendamento = {
      dataHora: this.date,
      descricao: this.descricao,
      idProfissional: this.dados.idProdissional,
      idUsuario: this.dados.idUser,
      atendimentoDomicilio: this.atendimentoDomicilio,
      pedicure: this.pedicure,
      manicure: this.manicure,
      confirmacao: false,
      pendente: true,
      nomeUsuario: this.dados.nomeUser
    };

    this.agendamentoService.addAgendamento(tipoAgendamento).then(() => {
      this.showToast('Agendamento realizado');
    }).catch(e => { console.log(e) });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  formatacaoDeData() {
    console.log("valor da data", this.event.startTime)


  }
  // --------------- Calendar -------------
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()))
      eventCopy.endTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1))
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected = (ev: { selectedTime: Date, events: any[] }) => {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));

    this.cont++;

    if (this.cont != 1 && this.calendar.mode == 'month') {
      console.log(this.cont);
      this.calendar.mode = 'day';
      this.cont = 0;
      this.contbo = true
      this.preencherCalendar(ev.selectedTime);
    }

    if (this.contbo && this.calendar.mode == 'day' && this.cont != 0) {

    }

  }

  onCurrentDateChanged(event: Date) {
    console.log("teste = " + event);

    if (this.calendar.mode == 'day') {

      this.preencherCalendar(event);

    }
  }

  reloadSource() {

  }



}
