import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page'

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {
  public coracaoCheio: string = "../../../../assets/icon/estrelaCheia.png"
  data: any;

  constructor(private route: ActivatedRoute, private router: Router, private tabs: TabsPage) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        console.log("Entrou");
        this.data = JSON.parse(params.special);
      } else {
        if (this.data == null) {
          console.log("Entrou 2");
          this.data = this.tabs.getUser();
          console.log(this.data);
        }
      }
    });
  }

  ngOnInit() {
  }

  exibeAvaliacao() {
    this.coracaoCheio

  }

  irParaAgendamento() {
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.data)
      }
    };
    this.router.navigate(['./usuario/agendamento'], navigateExtras);
  }

}
