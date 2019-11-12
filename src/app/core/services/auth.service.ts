import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { AuthOptions,AuthProvider,User } from './auth.types';
import { UserService, TypeUser } from 'src/app/service/user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { 
    this.authState$ = this.afAuth.authState;
   //this.logout() //redireciona pra pagina de login se nao tiver altenticado
    
  }
  get isAuthenticated(): Observable<boolean>{
    return this.authState$.pipe(map(user => user !== null));
  }
  
  authenticate({isSignIn, provider, user}: AuthOptions): Promise <auth.UserCredential> {
    let operation : Promise <auth.UserCredential>;

    if (provider !=+ AuthProvider.Email){
      operation = this.signInWithPopup(provider);
    }else{
      operation = isSignIn ? this.signInWinthEmail(user): this.signUpWinthEmail(user);
    }
    return operation;
  }

  logout(): Promise <void>{
    return this.afAuth.auth.signOut();
  }

  private signInWinthEmail({email,password}: User): Promise <auth.UserCredential> {

    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
  private signUpWinthEmail({email,password,name}:User): Promise<auth.UserCredential>{
    
    let typeUser: TypeUser = {nome: name, email: email, profissionalAtivo: false};
    
    this.userService.addUser(typeUser).catch(e =>{console.log(e)});

    return this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(credentials => credentials
      .user.updateProfile({displayName:name, photoURL:null})
      .then(()=> credentials));
    
  }
  private signInWithPopup(provider : AuthProvider): Promise <auth.UserCredential> {
    let signInProvider = null;


    switch(provider){
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;

    }
    return this.afAuth.auth.signInWithPopup(signInProvider);
  }
}
