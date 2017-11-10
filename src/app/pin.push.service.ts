import { OnDestroy, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Message} from '@stomp/stompjs';

import { Subscription } from 'rxjs/Subscription';
import {StompService} from '@stomp/ng2-stompjs';

@Injectable()
export class PinPushService implements OnDestroy {

  // Stream of messages
  private subscription: Subscription;
  public messages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;

  constructor(private _stompService: StompService) {
    this.subscribed = false;
    // Store local reference to Observable
    // for use with template ( | async )
    //this.subscribe();
  }

  public subscribe(topic: string, callback) {
    if (this.subscribed) {
      return;
    }
    /*
    // Stream of messages
    this.messages = this._stompService.subscribe('/topic/pins');
    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(this.on_next);
    this.subscribed = true; */

    // Stream of messages
    this.messages = this._stompService.subscribe(topic);
    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(callback);
    this.subscribed = true; 
  }

  public unsubscribe() {
    if (!this.subscribed) {
      return;
    }
    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;
    this.subscribed = false;
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  /** Consume a message from the _stompService */
  public on_next = (message: Message) => {
    // Log it to the console
    console.log(message);
  }
}