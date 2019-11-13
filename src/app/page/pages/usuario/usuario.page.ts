
import { Component, OnInit } from '@angular/core';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs.page'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  vetor: any;
  data: any;

  
  
  constructor(private userService: UserService, private toastCtrl: ToastController, 
    private afAuth: AngularFireAuth, private tabs: TabsPage, private route: ActivatedRoute, 
    private router: Router) { 

  } 
  public titulo :string = 'Mands';

  ngOnInit() {    
    this.vetor = this.tabs.getUser()
  }

  irParaCriaProfissional(){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.vetor)
      }
    };
    this.router.navigate(['./usuario/criar-profissional'], navigateExtras);
  }
                         
}                
     
            