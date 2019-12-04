import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { FirebaseApp } from '@angular/fire';

export interface TypeUser {
  id?: string,
  nome: string,
  email: string,
  profissionalAtivo: boolean,
  rua: string,
  bairro: string,
  telefone: string,
  numeroResidencia: number,
  sobrenome: string
}

export interface TypePro {
  nomePro: string,
  descricaoServico: string,
  atendimentoDomicilio: boolean,
  manicure: boolean,
  precoManicure: number,
  pedicure: boolean,
  precoPedicure: number,
  classificacao: number,
  cabelo: boolean,
  maquiagem: boolean,
  idade: number,
  precoMaquiagem: number,
  precoCabelo: number,
  horarioManhaPro: number[],
  horarioTardePro: number[],
  horarioNoitePro: number[],
  diaDaSemanaPro: number[],

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Observable<any[]>;
  private userCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private fb: FirebaseApp) {

    this.userCollection = this.afs.collection<any>('User');

    this.user = this.userCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    );

  }

  getUsers(): Observable<any[]> {
    return this.user;
  }

  getUserByKey(id: string): Observable<any> {
    return this.userCollection.doc<any>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user
      })
    );
  }

  addUser(user: TypeUser): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  uploadImage(fileToUpload: any, user: any): Promise<void> {
    let storageRef = this.fb.storage().ref();
    let basePath = '/user/'
    let fullPath = basePath + '/' + user.nome + '.jpg';
    let uploadTask = storageRef.child(fullPath).putString(fileToUpload, 'base64');
    let url = uploadTask.snapshot.downloadURL;

    return this.userCollection.doc(user.id).update({
      fullPath: fullPath,
      url: url
    });
  }

  updateUserToPro(user: any, pro: TypePro): Promise<void> {
    return this.userCollection.doc(user.id).update({
      profissionalAtivo: true,
      nomePro: pro.nomePro,
      atendimentoDomicilio: pro.atendimentoDomicilio,
      descricaoServico: pro.descricaoServico,
      manicure: pro.manicure,
      pedicure: pro.pedicure,
      classificacao: pro.classificacao,
      idade: pro.idade,
      cabelo: pro.cabelo,
      maquiagem: pro.maquiagem,
      precoManicure: pro.precoManicure,
      precoPedicure: pro.precoPedicure,
      precoMaquiagem: pro.precoMaquiagem,
      precoCabelo: pro.precoCabelo,
      horarioManhaPro: pro.horarioManhaPro,
      horarioTardePro: pro.horarioTardePro,
      horarioNoitePro: pro.horarioNoitePro,
      diaDaSemanaPro: pro.diaDaSemanaPro
    });
  }

  UpdateUserService(user: any): Promise<void> {
    if (user.profissionalAtivo) {
      return this.userCollection.doc(user.id).update({
        nome: user.nome,
        email: user.email,
        profissionalAtivo: user.profissionalAtivo,
        nomePro: user.nomePro,
        atendimentoDomicilio: user.atendimentoDomicilio,
        descricaoServico: user.descricaoServico,
        manicure: user.manicure,
        pedicure: user.pedicure,
        classificacao: user.classificacao,
        idade: user.idade,
        cabelo: user.cabelo,
        maquiagem: user.maquiagem,
        precoManicure: user.precoManicure,
        precoPedicure: user.precoPedicure,
        precoMaquiagem: user.precoMaquiagem,
        precoCabelo: user.precoCabelo,
        horarioManhaPro: user.horarioManhaPro,
        horarioTardePro: user.horarioTardePro,
        horarioNoitePro: user.horarioNoitePro,
        diaDaSemanaPro: user.diaDaSemanaPro
      });
    }else{
      return this.userCollection.doc(user.id).update({
        nome: user.nome,
        email: user.email,
        profissionalAtivo: user.profissionalAtivo
      });
    }
  }

}
