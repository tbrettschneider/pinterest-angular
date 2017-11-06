import { Component, OnInit } from '@angular/core';
import { PinterestService } from './pinterest.service';
import { Pin } from './pin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PinterestService]
})
export class AppComponent implements OnInit {

  private pins: Pin[];

  constructor(private pinterestService:PinterestService) {
  }

  ngOnInit() {
    //when component loading get all pins and set the pin[]
    this.getAllPins();
  }

  getAllPins() {
    this.pinterestService.findAll().subscribe(
      pins => {
        this.pins = pins['_embedded'].pins;
      },
      err => {
        console.log(err);
      }
    );
  }
}
