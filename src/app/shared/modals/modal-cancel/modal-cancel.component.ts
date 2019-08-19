import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.scss']
})
export class ModalCancelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToLogin() {
    (<any>$('#ModalCancel')).modal('hide');
    this.router.navigate([`signin`]);
  }

}
