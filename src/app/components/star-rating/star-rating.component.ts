import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**inspired on https://github.com/melwinVincent/ionic4-star-rating */

@Component({
  selector: 'star-rating',
  template: `
    <div class="rating">
      <ion-button
        fill="clear"
        [id]="index"
        [color]="index < this.Math.round(this.parseFloat(rating)) ? activeColor : defaultColor"
        *ngFor="let index of iconsArray"
        (click)="changeRating($event)"
      >
        <ion-icon
          slot="icon-only"
          [ngStyle]="{
            'font-size': fontSize
          }"
          name="{{
            halfStar && rating - index > 0 && rating - index <= 0.5
              ? halfIcon
              : index < this.Math.round(this.parseFloat(rating))
              ? activeIcon
              : defaultIcon
          }}"
        ></ion-icon>
      </ion-button>
    </div>
  `,
  styles: [
    `
      .rating ion-button {
        --padding-end: 0;
        --padding-start: 0;
        --padding-top: 0;
      }
    `
  ],
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

  @Input() readonly = false;
  @Input() activeColor = 'success';
  @Input() defaultColor = 'dark';
  @Input() activeIcon = 'star';
  @Input() defaultIcon = 'star-outline';
  @Input() halfIcon = 'star-half';
  @Input() halfStar = false;
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
    this.readonly = isDisabled ? true : false;
  }

  public get rating(): number {
    return this._rating;
  }

  constructor() {
    this.Math = Math;
    this.parseFloat = parseFloat;
  }

  changeRating(event: any) {
    if (this.readonly) {
      return;
    }
    // event is different for firefox and chrome
    // tslint:disable-next-line: radix
    const id = event.target.id ? parseInt(event.target.id) : parseInt(event.target.parentElement.id);

    if (this.halfStar) {
      this.rating = this.rating - id > 0 && this.rating - id <= 0.5 ? id + 1 : id + 0.5;
    } else {
      this.rating = id + 1;
    }

    // emitting event
    this.ratingChanged.emit(this.rating);
  }
}
