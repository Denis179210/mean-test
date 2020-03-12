import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RecordFormComponent } from './components/record-form/record-form.component';


@NgModule({
  declarations: [RecordsComponent, RecordFormComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    MatTableModule,
    MatDialogModule,
    SharedModule
  ]
})
export class RecordsModule { }
