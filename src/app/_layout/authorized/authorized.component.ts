import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {
  collapseMenu = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToCreate() {
    this.router.navigate(['/petition/create'])
  }

  public onBtnMenuClick() {
    this.collapseMenu = !this.collapseMenu;
  }

}
