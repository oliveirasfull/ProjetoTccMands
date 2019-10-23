
import { Component, OnInit  } from '@angular/core';


@Component({
  selector: 'app-criacao-do-profissional',
  templateUrl: './criacao-do-profissional.page.html',
  styleUrls: ['./criacao-do-profissional.page.scss'],
})
export class CriacaoDoProfissionalPage implements OnInit {
  public primeiroNome : string
  public segundoNome : string
  public nomeProfissional: string
  public manicure : boolean = false
  public pedicure : boolean = false
  public atendimentoDomicilio: boolean = false
  public idade: number



  public profissionalAtivo: boolean = false

  

  constructor() { }

  ngOnInit() {
  }

  public salvar():any{
    this.profissionalAtivo= true
    console.log(this.profissionalAtivo)
    
  }

  public voltar():void{

  }
}
