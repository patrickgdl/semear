import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StarRatingComponent,
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor, OnInit {
  private _rating: number;
  private onChange: any;
  private onTouched: any;
  public disabled: boolean;

  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  @Input() readonly = 'false';
  @Input() activeColor = '#488aff';
  @Input() defaultColor = '#aaaaaa';
  @Input() activeIcon = 'ios-star';
  @Input() defaultIcon = 'ios-star-outline';
  @Input() halfIcon = 'ios-star-half';
  @Input() halfStar = 'false';
  @Input() maxRating = 5;
  @Input() fontSize = '28px';
  @Input() public set rating(val: number) {
    this._rating = val;
    // for form
    if (this.onChange) {
      this.onChange(val);
    }
  }

  Math: any;
  parseFloat: any;
  iconsArray: number[] = [];

  ngOnInit() {
    this.rating = this.rating || 3; // default after input`s initialization
    for (let i = 0; i < this.maxRating; i++) {
      this.iconsArray.push(i);
    }
  }

  writeValue(obj: number) {
    this.rating = obj;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    this.readonly = isDisabled ? 'true' : 'false';
  }

  public get rating(): number {
    return this._rating;
  }

  constructor() {
    this.Math = Math;
    this.parseFloat = parseFloat;
  }

  changeRating(event: any) {
    if (this.readonly && this.readonly === 'true') {
      return;
    }
    // event is different for firefox and chrome
    // tslint:disable-next-line: radix
    const id = event.target.id ? parseInt(event.target.id) : parseInt(event.target.parentElement.id);

    if (this.halfStar && this.halfStar === 'true') {
      this.rating = this.rating - id > 0 && this.rating - id <= 0.5 ? id + 1 : id + 0.5;
    } else {
      this.rating = id + 1;
    }

    // unique event
    this.ratingChanged.emit(this.rating);
  }
}
