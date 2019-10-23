import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  public titulo :string = 'Mands'
  public profissional : boolean  // responsavel por definir ser o usuario e profisional ou nao nas regras de template

  constructor() { } 

  ngOnInit() {       
  }        
                         
}                     
     
            