import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {

  form: FormGroup;
  agendamento: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      data: [this.agendamento.data],
      hora: [this.agendamento.hora]
    });
  }

  onSubmit(){
    
  }

}
