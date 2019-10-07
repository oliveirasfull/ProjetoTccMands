import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criacao-do-profissional',
  templateUrl: './criacao-do-profissional.page.html',
  styleUrls: ['./criacao-do-profissional.page.scss'],
})
export class CriacaoDoProfissionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
const controller = document.querySelector('ion-alert-controller');
    let firstName, lastName;
    function processForm(event) {
      event.preventDefault();
      controller.create({
        header: 'Account Created',
        message: `Created account for: <b>${firstName} ${lastName}</b>`,
        buttons: [{
          text: 'OK'
        }]
      }).then(alert => alert.present());
    }
    function handleFirstNameValue(event) {
      firstName = event.target.value;
    }
    function handleLastNameValue(event) {
      lastName = event.target.value;
    }
