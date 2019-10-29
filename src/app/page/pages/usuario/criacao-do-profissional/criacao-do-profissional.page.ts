import { Profissional } from './../../shared/profissional.model';


import { Component} from '@angular/core';





@Component({
  selector: 'app-criacao-do-profissional',
  templateUrl: './criacao-do-profissional.page.html',
  styleUrls: ['./criacao-do-profissional.page.scss'],
})
export class CriacaoDoProfissionalPage extends Profissional {

  
  
 


 

  constructor() { 
    super()
    
   
    
    
  }

  
  public salvar():any{
    console.log(this.primeiroNome)
   
    
   
    
  }

  public voltar():void{

  }

}
