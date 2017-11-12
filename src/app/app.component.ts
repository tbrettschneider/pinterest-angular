import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PinterestService } from './pinterest.service';
import { Pin } from './pin';
import { PinPushService } from './pin.push.service';
import { Message } from '@stomp/stompjs';
import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.bootstrap.html',
  providers: [PinterestService, PinPushService]
})
export class AppComponent implements OnInit {

  
  selectedPin;

  private pins: Pin[];

  constructor(
    private pinterestService:PinterestService,
    private pinPushService:PinPushService,
    private changeDetector:ChangeDetectorRef) {}

  ngOnInit() {
    //when component loading get all pins and set the pin[]
    this.getAllPins();
    //handle stomp messages for new pins
    this.listenForFreshPins(); 
  }

  private setSelectedPin(pin) {
    this.selectedPin = pin;
    console.log('You selected pin %s', JSON.stringify(pin));
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

  listenForFreshPins() {
    this.pinPushService.subscribe('/topic/pins', (message: Message) => {
      let json = JSON.parse(message.body);
      this.pins.push(new Pin(json.id, json.url, json.description));
      this.changeDetector.detectChanges();
    });
  }
}
