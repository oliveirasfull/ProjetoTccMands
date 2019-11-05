
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { OverlayService } from './../../../core/services/overlay.service';
import {  AuthProvider } from './../../../core/services/auth.types';
import { AuthService } from './../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  authForm : FormGroup;
  authProviders = AuthProvider;
  configs ={
    isSignIn: true,
    action: 'login',
    actionChange:'Criar conta'
  };

  private nameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private overlayService : OverlayService,
    private navCtrl : NavController,
    private route : ActivatedRoute
    ) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    });
  }
  get name(): FormControl{
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl{
    return <FormControl>this.authForm.get('email');
  }
  get password(): FormControl{
    return <FormControl>this.authForm.get('password');
  }
  changeAuthAction(): void{
    this.configs.isSignIn = !this.configs.isSignIn;
    const{ isSignIn} = this.configs;
    this.configs.action = isSignIn ? 'login' : "Inscrever-se";
    this.configs.actionChange = isSignIn ? 'Criar Conta' : ' Alterar Criação';
    !isSignIn
      ? this.authForm.addControl('name',this.nameControl)
      :this.authForm.removeControl('name');
  }

 async onSubmit(provider: AuthProvider): Promise <void>{
   const loading = await this.overlayService.loading(); 
   try{
     const credentials = await this.authService.authenticate({
       isSignIn : this.configs.isSignIn,
       user: this.authForm.value,
       provider
     });
   this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') ||'/usuario/feed');
   } catch(e){
     console.log('Autenticacao ERRO',e);
     await this.overlayService.toast({
       message: e.message
     })
   } finally{
     loading.dismiss();
   }
  
  }

}
