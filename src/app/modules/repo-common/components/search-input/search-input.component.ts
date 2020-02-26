import { Component, OnInit, Input, ViewChild, Renderer2, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchInputComponent), multi: true }]
})
export class SearchInputComponent implements OnInit {
  @ViewChild('input', {static: true}) input;
  private onChange: any;
  private onTouched: any;

  @Input()
  public buttonText: string;

  @Input()
  public isValid = false;

  @Output()
  clicked = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {
    const inputField = this.input.nativeElement;
    this.renderer.setProperty(inputField, 'value', obj);
  }

  change( $event ) {
    this.onChange($event.target.value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  buttonClicked() {
    if (this.isValid) {
      this.clicked.emit();
    }
  }

}
