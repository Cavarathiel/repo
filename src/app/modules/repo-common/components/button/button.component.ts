import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @HostBinding('class.disabled')
  @Input()
  public disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
