
import { Component, OnInit } from '@angular/core';
import { UserService, TypeUser, TypePro } from 'src/app/service/user.service';
import { ToastController, AlertController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Agendamento } from 'src/app/service/agendamento/agendamento.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  vetor: any;
  data: any;
  photo : string = '';
  erro: any;
  agendamento: Agendamento[];
  contAgen: number;
  
  
  constructor(private userService: UserService, private toastCtrl: ToastController, 
    private tabs: TabsPage, private route: ActivatedRoute, 
    private router: Router, private camera: Camera, private geolocation: Geolocation ) { 

  } 
  public titulo :string = 'Mands';

  ngOnInit() {    
    this.vetor = this.tabs.getUser();
    this.agendamento = this.tabs.getAgendamentoByKeyUserConfirmado(this.vetor.id);
    this.contAgen = this.agendamento.length;
  }

  irParaCriaProfissional(){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.vetor)
      }
    };
    this.router.navigate(['./usuario/criar-profissional'], navigateExtras);
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photo = base64Image;
      this.userService.uploadImage(this.photo, this.vetor).then(() =>{
        
      }).catch(e =>{
     
        this.erro = e;
      });
     });
  }

  gps(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  } 
  irParaNotificacao(){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.vetor)
      }
    };
    this.router.navigate(['./usuario/notificacoes'], navigateExtras);
  }                  
}                
     
            