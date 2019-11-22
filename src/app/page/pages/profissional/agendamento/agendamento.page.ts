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

  dados: any;
  date: Date;
  hora: string;
  descricao: string;
  atendimentoDomicilio: boolean = false;
  pedicure: boolean = false;
  manicure: boolean = false;
  vetorAgendamento: any[];

  minDate = new Date().toISOString();

  event = {
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  };

  eventSource = [];

  calendar = {
    mode: 'month',
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
    this.resetEvent();
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

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
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

  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  onCurrentDateChanged() {

  }

  reloadSource() {

  }

}
