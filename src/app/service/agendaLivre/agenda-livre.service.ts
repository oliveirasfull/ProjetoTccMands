import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

interface AgendaLivre{
  id?: string;
  domigo: string[];
  segunda: string[];
  terca: string[];
  quarta: string[];
  quinta: string[];
  sexta: string[];
  sabado: string[];  
}

@Injectable({
  providedIn: 'root'
})
export class AgendaLivreService {

  private agendaLivre: Observable<AgendaLivre[]>;
  private agendaLivreCollection: AngularFirestoreCollection<AgendaLivre>; 

  constructor(private afs: AngularFirestore) { 
    this.agendaLivreCollection = this.afs.collection<AgendaLivre>('AgendaLivre');
    
    this.agendaLivre = this.agendaLivreCollection.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    );

  }

  getAgendaLivre(): Observable<AgendaLivre[]>{
    return this.agendaLivre;
  }

  getAgendaLivreByKey(id: string): Observable<AgendaLivre>{
    return this.agendaLivreCollection.doc<AgendaLivre>(id).valueChanges().pipe(
      take(1),
      map(agendaLivre => {
        agendaLivre.id = id;
        return agendaLivre
      })
    );
  }

}
