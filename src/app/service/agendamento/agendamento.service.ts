import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

export interface Agendamento{
  id?:string;
  dataHora: Date;
  descricao: string;
  idProfissional: string;
  idUsuario: string;
  nomeUsuario: string;
  atendimentoDomicilio: boolean;
  manicure: boolean;
  pedicure: boolean;
  confirmacao: boolean;
  pendente: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private agendamento : Observable<Agendamento[]>;
  private agendamentoCollection: AngularFirestoreCollection<Agendamento>;

  constructor(private afs: AngularFirestore) { 
    this.agendamentoCollection = this.afs.collection<Agendamento>('Agendamento');

    this.agendamento = this.agendamentoCollection.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    );
  }

  getAgendamento(): Observable<Agendamento[]>{
    return this.agendamento;
  }

  getAgendamentoByKey(id: string): Observable<Agendamento>{
    return this.agendamentoCollection.doc<Agendamento>(id).valueChanges().pipe(
      take(1),
      map(agendamento => {
        agendamento.id = id;
        return agendamento
      })
    );
  }

  addAgendamento(agendamento: Agendamento): Promise<DocumentReference>{
    return this.agendamentoCollection.add(agendamento);
  }

  cancelarAgendamento(id: string): Promise<void>{
    return this.agendamentoCollection.doc(id).delete();
  }
  
  confirmarAgendamento(agendamento: Agendamento): Promise<void>{
    return this.agendamentoCollection.doc(agendamento.id).update({
      confirmacao : agendamento.confirmacao,
      pendente : agendamento.pendente
    });
  }
}

