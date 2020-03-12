import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BasicComponent } from '../basic.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BasicComponent implements OnInit {

  @ViewChild('input', {static: false}) set input(input: ElementRef<HTMLInputElement>) {
    if (input && 'nativeElement' in input) {
      const evtTarget: HTMLInputElement = input.nativeElement;
      fromEvent(evtTarget, 'input')
        .pipe(
          distinctUntilChanged(),
          debounceTime(250),
          takeUntil(this.destroy$)
        )
        .subscribe((evt: Event) => {
          this.searchEvent.emit(evtTarget.value);
        });
    }
  }

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() background: string = '';
  @Input() iconPosition: string = 'right';
  @Input() set border(value: boolean) {
    if (!value) {
      this._borderClass = 'no-border';
    }
  }

  _borderClass: string = '';

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit() {}
}
