import { Component, OnInit, ViewChild } from '@angular/core';
import { PinterestService } from '../pinterest.service';
import { Pin } from '../pin';
import { Input } from '@angular/core/src/metadata/directives';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-pin-modal',
  templateUrl: './addpin.component.html',
  providers: [PinterestService]
})
export class AddPinComponent {

  @ViewChild('form') form: NgForm;
  public pin: Pin = new Pin();

  constructor(private pinterestService:PinterestService) {}

  addPin() {
    console.log(JSON.stringify(this.pin));
    this.pinterestService.create(this.pin);
  }
}
