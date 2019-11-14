import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/service/user.service';
import { AgendamentoService, Agendamento } from 'src/app/service/agendamento/agendamento.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public profissional : boolean // responsavel por definir ser o usuario e profisional ou nao nas regras de template
  public user : any;
  public agendamento: Agendamento[];


  constructor(private afAuth: AngularFireAuth, private userService: UserService, private agendamentoService: AgendamentoService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.userService.getUsers().subscribe(usuario => {
        for (let x = 0; x < usuario.length; x++) {
          if (usuario[x].email == user.email) {
            this.profissional = usuario[x].profissionalAtivo;
            this.user = usuario[x];
            break;
          }
        }
      });
    });

    this.agendamentoService.getAgendamento().subscribe(agen => {
      this.agendamento = agen;
    });
  }

  getUser(){
    return this.user;
  }

  getAgendamentoByKey(id: string): Agendamento[]{
    
    let agendamentoUser : Agendamento[];

    this.agendamento.forEach(element => {
      if(element.id == id){
        agendamentoUser.push(element);
      }
    });

    return agendamentoUser;
  }

}
