import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { PinterestService } from './pinterest.service';
import { PinService } from './pin.service';
import { WebsocketService } from './websocket.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [PinterestService, WebsocketService, PinService],
  bootstrap: [AppComponent],
})
export class AppModule { }
