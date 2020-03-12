import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export abstract class BasicComponent implements OnDestroy {

  protected destroy$ = new ReplaySubject(1);

  protected constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
