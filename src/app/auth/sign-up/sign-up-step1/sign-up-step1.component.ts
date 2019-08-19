import { Component, OnInit } from '@angular/core';
import { Clients } from '../models/sign-up-clients.model';
import { SignUpService } from '../sign-up.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sign-up-step1',
  templateUrl: './sign-up-step1.component.html',
  styleUrls: ['./sign-up-step1.component.scss'],
  animations: [
    trigger('auth', [
      transition ('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(650, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition ('* => void', [
        animate(650, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SignUpStep1Component implements OnInit {
  constructor(
    private signUpService: SignUpService
  ) { }

  ngOnInit() {
  }

  setClient(client: string) {
    this.signUpService.setClient(Clients[client]);
  }

}
