import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page'

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {
  public coracaoCheio : string ="../../../../assets/icon/estrelaCheia.png"
  data: any;
  tabs: TabsPage;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
      if (this.data.length == 0 || this.data == null){
        this.data = this.tabs.getUser();
      }
    });
  }

  ngOnInit() {
  }

  exibeAvaliacao(){
    this.coracaoCheio 

  }

  irParaAgendamento(){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.data)
      }
    };
    this.router.navigate(['./usuario/agendamento'], navigateExtras);
  }

}
