import { Component, OnInit } from '@angular/core';
import { PinterestService } from './pinterest.service';
import { Pin } from './pin';
import { PinPushService } from './pin.push.service';
import { Message } from '@stomp/stompjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PinterestService, PinPushService]
})
export class AppComponent implements OnInit {

  private pins: Pin[];

  pinterestService: PinterestService;
  pinPushService: PinPushService;

  constructor(pinterestService:PinterestService, pinPushService:PinPushService) {
    this.pinterestService = pinterestService;
    this.pinPushService = pinPushService;
  }

  ngOnInit() {
    //when component loading get all pins and set the pin[]
    this.getAllPins();
    this.pinPushService.subscribe('/topic/pins', (message: Message) => {
      console.log(message);
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
