import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent implements OnInit {

  public options: Array<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupMenuComponent>
  ) { }

  ngOnInit() {
    this.options = this.data.options.value;

    const triggerMetrics = this.data.trigger.getBoundingClientRect();
    const position = {
      left: `${triggerMetrics.left - (this.data.offset || 0)}px`,
      top: `${triggerMetrics.top + triggerMetrics.height + 5}px`
    }
    if (this.data.updateSize) {
      this.dialogRef.updateSize(`${triggerMetrics.width}px`, `${triggerMetrics}px`);
    }
    this.dialogRef.updatePosition(position);
  }

  select(selection: any) {
    const closeWithResult = this.data.options.expectSelection ? selection : null;
    this.dialogRef.close(closeWithResult);
  }

  reset() {
    this.dialogRef.close('');
  }

}
