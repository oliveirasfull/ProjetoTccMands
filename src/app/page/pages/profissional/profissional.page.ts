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
        this.data = JSON.parse(params.special);
      } else {
        if (this.data == null) {
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
    let user = {idProdissional: this.data.id, idUser: this.tabs.user.id}
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(user)
      }
    };
    this.router.navigate(['./usuario/agendamento'], navigateExtras);
  }

}
