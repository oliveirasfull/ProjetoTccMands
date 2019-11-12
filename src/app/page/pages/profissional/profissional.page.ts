import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {
  public coracaoCheio : string ="../../../../assets/icon/estrelaCheia.png"
  data: any;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
  }

  ngOnInit() {
  }

  exibeAvaliacao(){
    this.coracaoCheio 

  }

}
