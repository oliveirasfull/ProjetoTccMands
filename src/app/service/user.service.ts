import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface TypeUser {
  id?: string,
  nome: string,
  email: string,
  profissionalAtivo: boolean
}

export interface TypePro {
  nomePro: string,
  atendimentoDomicilio: boolean,
  manicure: boolean,
  precoManicure: number,
  pedicure: boolean,
  precoPedicure: number,
  classificacao: number,
  idade: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Observable<any[]>;
  private userCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    
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

  getUserByEmail(email: string): Observable<any> {
    return this.userCollection.doc<any>(email).valueChanges().pipe(
      take(1),
      map(user => {
        console.log(email);
        user.email == email;
        return user
      })
    );
  }

  addUser(user: TypeUser): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  updateUserToPro(user: any, pro: TypePro): Promise<void> {
    return this.userCollection.doc(user.id).update({ 
      tipo: true,
      nomePro: pro.nomePro,
      atendimentoDomicilio: pro.atendimentoDomicilio,
      manicure: pro.manicure,
      precoManicure: pro.precoManicure,
      pedicure: pro.pedicure,
      precoPedicure: pro.precoPedicure,
      classificacao: pro.classificacao,
      idade: pro.idade
    });
  }

}
