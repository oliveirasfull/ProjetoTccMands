import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

interface AgendaOcupada{
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
export class AgendaOcupadaService {

  private agendaOcupada: Observable<AgendaOcupada[]>;
  private agendaOcupadaCollection: AngularFirestoreCollection<AgendaOcupada>;

  constructor(private afs: AngularFirestore) {
    this.agendaOcupadaCollection = this.afs.collection<AgendaOcupada>('AgendaOcupada');
    
    this.agendaOcupada = this.agendaOcupadaCollection.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    );
   }

   getAgendaLivre(): Observable<AgendaOcupada[]>{
    return this.agendaOcupada;
  }

  getAgendaLivreByKey(id: string): Observable<AgendaOcupada>{
    return this.agendaOcupadaCollection.doc<AgendaOcupada>(id).valueChanges().pipe(
      take(1),
      map(agendaOcupada => {
        agendaOcupada.id = id;
        return agendaOcupada
      })
    );
  }
}
