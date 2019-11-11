import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {
public coracaoCheio : string ="../../../../assets/icon/estrelaCheia.png"

  constructor() { }

  ngOnInit() {
  }

  exibeAvaliacao(){
    this.coracaoCheio 

  }

}
