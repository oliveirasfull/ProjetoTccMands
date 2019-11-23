import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { resolve } from 'url';
import { reject } from 'q';

export interface TypeUser {
  id?: string,
  nome: string,
  email: string,
  profissionalAtivo: boolean
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
  precoMaquiagem : number,
  precoCabelo :number,
  horarioManhaPro : [],
  horarioTardePro : [],
  horarioNoitePro : [],
  diaDaSemanaPro : [],

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Observable<any[]>;
  private userCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private fb: FirebaseApp) {
    
    this.userCollection = this.afs.collection<any>('User');

    this.user = this.userCollection.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
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

  saverImage(user: any, fileToUpload: any){
    return new Promise((resolve, reject) => {
      let storageRef = this.fb.storage().ref();
      let basePath = '/cliente/';
      user.fullPath = basePath + '/' + user.nome + '/' + '.jpg';
      let uploadTask = storageRef.child(user.fullPath).putString(fileToUpload, 'base64');
      user.url = uploadTask.snapshot.downloadURL;
    });
  }

  updateUserToPro(user: any, pro: TypePro): Promise<void> {
    return this.userCollection.doc(user.id).update({ 
      profissionalAtivo: true,
      nomePro: pro.nomePro,
      atendimentoDomicilio: pro.atendimentoDomicilio,
      descricaoServico:pro.descricaoServico,
      manicure: pro.manicure,
      pedicure: pro.pedicure,
      classificacao: pro.classificacao,
      idade: pro.idade,
      cabelo: pro.cabelo,
      maquiagem: pro.maquiagem, 
      precoManicure: pro.precoManicure,
      precoPedicure: pro.precoPedicure,
      precoMaquiagem : pro.precoMaquiagem,
      precoCabelo : pro.precoCabelo,
      horarioManhaPro : pro.horarioManhaPro,
      horarioTardePro : pro.horarioTardePro,
      horarioNoitePro : pro.horarioTardePro,
      diaDaSemanaPro : pro.diaDaSemanaPro
    });
  }

}
