import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormComponent } from './components/record-form/record-form.component';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RecordService } from './services/record.service';
import { MatTableDataSource } from '@angular/material/table';
import { BasicComponent } from '../../shared/components/basic.component';
import { PromptComponent } from '../../shared/components/prompt/prompt.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent extends BasicComponent implements OnInit {

  public columnsToDisplay = [];
  public dataSource;
  public predefinedRoles: any = {};
  public stats;

  public searchForm = new FormGroup({
    search: new FormControl('', {}),
    role: new FormControl('', {})
  });

  private refreshDataSource$ = new BehaviorSubject<boolean>(true);

  constructor(
    private dialog: MatDialog,
    private recordService: RecordService
  ) {
    super();
  }

  ngOnInit(): void {

    this.recordService.receivePredefinedRoles()
      .subscribe(({roles}: any) => {
        this.predefinedRoles.hash = roles.reduce((a, b) => {
          return {
            ...a,
            [b.name]: b._id
          };
        }, {});
        this.predefinedRoles.options =  Object.keys(this.predefinedRoles.hash);
      });

    this.refreshDataSource$
      .asObservable()
      .pipe(
        switchMap(() => {
          return this.recordService.receiveStats();
        }),
        switchMap((stats) => {
          this.stats = Object.entries(stats);
          return this.recordService.receiveMany();
        }),
        map((res: any) => this.normalizeDataSource(res.results)),
        takeUntil(this.destroy$)
      )
      .subscribe((records: any) => {
        this.dataSource = new MatTableDataSource(records);
        this.columnsToDisplay = Object.keys(records[0] ? records[0] : {}).filter(key => key !== '_id');
      });

    this.searchForm.valueChanges
      .pipe(
        switchMap((fv: any) => {
          return this.recordService.receiveMany(fv.search, fv.role);
        }),
        map((res: any) => this.normalizeDataSource(res.results)),
        takeUntil(this.destroy$)
      )
      .subscribe((records) => {
        this.dataSource = new MatTableDataSource(records);
        this.columnsToDisplay = Object.keys(records[0] ? records[0] : {}).filter(key => key !== '_id');
      });
  }

  setRole(event) {
    this.searchForm.get('role').setValue(this.predefinedRoles.hash[event]);
  }

  createRecord() {
    const dialogRef = this.dialog.open(RecordFormComponent, {
      data: {
        predefinedRoles: this.predefinedRoles
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(v => !!v),
        switchMap((v) => {
          return this.recordService.create(v);
        })
      )
      .subscribe((v) => {
        this.refreshDataSource$.next(true);
      });
  }

  editRecord(record) {

    const dialogRef = this.dialog.open(RecordFormComponent, {
      data: {
        predefinedRoles: this.predefinedRoles,
        record
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(v => !!v),
        switchMap((payload) => {
          console.log(payload);
          return this.recordService.update(record._id, payload);
        })
      )
      .subscribe((v) => {
        console.log(v);
        this.refreshDataSource$.next(true);
      });
  }

  removeRecord(evt: MouseEvent, record: any) {

    const optionsRef = this.dialog.open(PromptComponent, {
      panelClass: 'popup-panel',
      backdropClass: 'popup-backdrop',
      data: {
        trigger: evt.currentTarget,
      }
    });

    optionsRef.afterClosed()
      .pipe(
        filter((opt: string) => opt === 'confirm'),
        switchMap(() => this.recordService.remove(record))
      )
      .subscribe((c) => {
        console.log(c);
        this.refreshDataSource$.next(true);
      });
  }

  private normalizeDataSource(rawData: Array<any>) {
    return rawData.map((record) => {
      return {
        ['First Name']: record.firstName,
        ['Last Name']: record.lastName,
        ['Email']: record.email,
        ['Role']: record.role.name,
        ['_id']: record._id
      };
    });
  }

}
