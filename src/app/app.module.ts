import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { PinterestService } from './pinterest.service';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { PinPushService } from './pin.push.service';

const stompConfig: StompConfig = {
  // Which server?
  url: 'ws://127.0.0.1:8080/ws',

  // Headers
  // Typical keys: login, passcode, host
  headers: {
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [PinterestService, StompService, PinPushService, {
    provide: StompConfig,
    useValue: stompConfig
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
