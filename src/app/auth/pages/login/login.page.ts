
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { OverlayService } from './../../../core/services/overlay.service';
import { AuthProvider } from './../../../core/services/auth.types';
import { AuthService } from './../../../core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'login',
    actionChange: 'Criar conta'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private sobrenomeControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private ruaControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private bairroControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private telefoneControl = new FormControl('', [Validators.required, Validators.minLength(9)]);
  private numeroResidenciaControl = new FormControl(0, [Validators.required]);

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) {
    if(this.afAuth.auth.currentUser){
      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/usuario/feed');
    }
  }

  ngOnInit() {
    this.createForm();
  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  get sobrenome(): FormControl {
    return <FormControl>this.authForm.get('sobrenome');
  }

  get telefone(): FormControl {
    return <FormControl>this.authForm.get('telefone');
  }

  get rua(): FormControl {
    return <FormControl>this.authForm.get('rua');
  }

  get bairro(): FormControl {
    return <FormControl>this.authForm.get('bairro');
  }

  get numeroResidencia(): FormControl {
    return <FormControl>this.authForm.get('numeroResidencia');
  }


  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'login' : "Inscrever-se";
    this.configs.actionChange = isSignIn ? 'Criar Conta' : ' Voltar';
    !isSignIn
      ? this.addFormsControl()
      : this.removeFormsControl();
  }

  addFormsControl() {
    this.authForm.addControl('name', this.nameControl);
    this.authForm.addControl('sobrenome', this.sobrenomeControl);
    this.authForm.addControl('telefone', this.telefoneControl);
    this.authForm.addControl('rua', this.ruaControl);
    this.authForm.addControl('bairro', this.bairroControl);
    this.authForm.addControl('numeroResidencia', this.numeroResidenciaControl);
  }

  removeFormsControl() {
    this.authForm.removeControl('name');
    this.authForm.removeControl('sobrenome');
    this.authForm.removeControl('telefone');
    this.authForm.removeControl('rua');
    this.authForm.removeControl('bairro');
    this.authForm.removeControl('numeroResidencia');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      let teste = this.authForm.value;
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      }, teste);
      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/usuario/feed');
    } catch (e) {
      console.log('Autenticacao ERRO', e);
      await this.overlayService.toast({
        message: e.message
      })
    } finally {
      loading.dismiss();
    }

  }

}
