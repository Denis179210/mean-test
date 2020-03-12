import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupMenuComponent>
  ) { }

  ngOnInit(): void {
    const triggerMetrics = this.data.trigger.getBoundingClientRect();
    const position = {
      left: `${triggerMetrics.left - (this.data.offset || 200)}px`,
      top: `${triggerMetrics.top + triggerMetrics.height + 5}px`
    };
    this.dialogRef.updatePosition(position);
  }

  select(selection: any) {
    const closeWithResult = this.data.options.expectSelection ? selection : null;
    this.dialogRef.close(closeWithResult);
  }

  decide(decision: string) {
    this.dialogRef.close(decision);
  }

}
