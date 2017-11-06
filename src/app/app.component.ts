import { Component, OnInit } from '@angular/core';
import { PinterestService } from './pinterest.service';
import { Pin } from './pin';
import { PinService } from './pin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PinterestService]
})
export class AppComponent implements OnInit {

  private pins: Pin[];

  pinService: PinService;
  pinterestService: PinterestService;

  constructor(pinterestService:PinterestService, pinService:PinService) {
    this.pinService = pinService;
    this.pinterestService = pinterestService;
  }

  ngOnInit() {
    //when component loading get all pins and set the pin[]
    this.getAllPins();

    this.pinService.messages.subscribe(msg => {			
      console.log("Response from websocket: " + msg);
		});
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
