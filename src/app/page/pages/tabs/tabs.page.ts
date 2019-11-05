import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public profissional : boolean = false// responsavel por definir ser o usuario e profisional ou nao nas regras de template
  constructor() { }

  ngOnInit() {
  }

}
