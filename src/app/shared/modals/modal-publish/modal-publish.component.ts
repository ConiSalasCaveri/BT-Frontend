import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-publish',
  templateUrl: './modal-publish.component.html',
  styleUrls: ['./modal-publish.component.scss']
})
export class ModalPublishComponent implements OnInit {

  @Output() submitted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public onSubmit() {
    this.submitted.emit();
  }

}
