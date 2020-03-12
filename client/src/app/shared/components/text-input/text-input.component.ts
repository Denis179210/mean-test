import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { BasicComponent } from '../basic.component';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BasicComponent implements OnInit {

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() parentControl: FormControl = new FormControl('');
  @Input() mode: 'inline' | 'area' = 'inline';

  @ViewChild('inputElement', {static: false}) input: ElementRef<HTMLElement>;

  public error$ = new BehaviorSubject(null);

  constructor() {
    super();
  }

  ngOnInit() {
    this.parentControl.valueChanges
      .pipe(
        switchMap(() => this.parentControl.statusChanges),
        filter(status =>  status !== 'PENDING'),
        takeUntil(this.destroy$)
      )
      .subscribe((value: any) => {
        const err: any = {};
        if (this.parentControl.invalid) {
          for (const error in this.parentControl.errors) {
            if (error === 'required') {
              err.required = `Field \'${this.title}\' is required`;
            } else if (error === 'minlength') {
              err.minlenght = `Field \'${this.title}\' should be at least ${this.parentControl.errors[error].requiredLength} symbols length`;
            } else {
              err[error] = this.parentControl.errors[error].title;
            }
          }
          this.error$.next(Object.values(err));
        } else {
          this.error$.next(null);
        }
      });
  }

  get invalidInput() {
    return this.parentControl.touched && this.parentControl.dirty && this.parentControl.errors;
  }

}
