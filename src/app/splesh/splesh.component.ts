import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splesh',
  templateUrl: './splesh.component.html',
  styleUrls: ['./splesh.component.css']
})
export class SpleshComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/logintype'])
    }, 2000)
  }

}
