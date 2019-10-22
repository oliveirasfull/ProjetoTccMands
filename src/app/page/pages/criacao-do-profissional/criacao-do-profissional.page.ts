import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criacao-do-profissional',
  templateUrl: './criacao-do-profissional.page.html',
  styleUrls: ['./criacao-do-profissional.page.scss'],
})
export class CriacaoDoProfissionalPage implements OnInit {
  public primeiroNome : string
  public segundoNome : string
  public nomeProfissional : string

  constructor() { }

  ngOnInit() {
  }

  public salvar():void{
    console.log("Primeiro nome ",this.primeiroNome)
   console.log(this.segundoNome)
   console.log(this.nomeProfissional)
  }
}
