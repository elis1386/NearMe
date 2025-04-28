import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    standalone: false
})
export class MainComponent {

  constructor(private router: Router){}

  goTo(){
    this.router.navigate(['map'])
  }

}
