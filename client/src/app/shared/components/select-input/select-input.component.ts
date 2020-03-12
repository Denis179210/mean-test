import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BasicComponent } from '../basic.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent extends BasicComponent {

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() options: Array<string>;
  @Input() selectedOption: string;

  @Output() inputValueChangesEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  openOptions(evt: MouseEvent) {
    const optionsRef = this.dialog.open(PopupMenuComponent, {
      panelClass: 'popup-panel',
      backdropClass: 'popup-backdrop',
      data: {
        trigger: evt.currentTarget,
        options: {
          value: this.options,
          expectSelection: true
        },
        updateSize: true
      }
    });
    optionsRef.afterClosed()
      .pipe(
        filter((opt: string) => {
          return opt !== null && opt !== this.selectedOption;
        })
      )
      .subscribe((opt: string) => {
        this.selectedOption = opt;
        this.inputValueChangesEvent.emit(opt);
      });
  }
}
