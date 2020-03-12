import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecordService } from '../../services/record.service';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit {

  public record;
  public formState: any = {};
  public predefinedRoles;
  public isDisabled = true;

  public FormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      (firstNameControl: AbstractControl) => {
        return !(new RegExp(/^([a-zA-Z]+$)/).test(firstNameControl.value.trim()))
          ? {invalid_first_name: { value: true, title: 'Field \'First Name\' is invalid' }}
          : null;
      },
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      (lastNameControl: AbstractControl) => {
        return !(new RegExp(/^([a-zA-Z]+$)/).test(lastNameControl.value.trim()))
          ? {invalid_last_name: { value: true, title: 'Field \'Last Name\' is invalid' }}
          : null;
      },
    ]),
    email: new FormControl('', [
      Validators.required,
      (emailControl: AbstractControl) => {
        return !(new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(emailControl.value.trim()))
          ? { invalid_email: { value: true, title: 'Field \'Email\' is invalid' }}
          : null;
      },
    ], this.formState.state === 'create' ? [
      this.uniqueEmailValidator.bind(this)
    ] : null),
    role: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<RecordFormComponent>,
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
    this.predefinedRoles = this.data.predefinedRoles;

    if (this.data.record) {
      this.formState.state = 'edit';
      this.formState.title = 'Edit record';
      this.formState.selectedRole = this.data.record['Role'];

      this.FormGroup.controls.firstName.setValue(this.data.record['First Name']);
      this.FormGroup.controls.lastName.setValue(this.data.record['Last Name']);
      this.FormGroup.controls.email.setValue(this.data.record['Email']);
      this.FormGroup.controls.role.setValue(this.data.predefinedRoles.hash[this.data.record['Role']]);

      this.FormGroup.markAsTouched();
      this.FormGroup.markAsDirty();

    } else {
      this.formState.state = 'create';
      this.formState.title = 'Create new record';
    }
    this.FormGroup.valueChanges
      .subscribe((fv: any) => {
        this.isDisabled = !this.FormGroup.valid;
      });
  }

  setRole(event) {
    this.FormGroup.get('role').setValue(this.predefinedRoles.hash[event]);
  }

  createRecord() {
    if (this.isDisabled) {
      return;
    }
    console.log(this.FormGroup.value);
    this.dialogRef.close(this.FormGroup.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  private uniqueEmailValidator(control: FormControl) {
    return control.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        take(1),
        switchMap(value => {
          return this.recordService.checkEmail(value)
            .pipe(
              take(1),
              map(({exists}: {exists: boolean}) => {
                return exists
                  ? { existing_email: {value: true, title: 'This email is already in use'} }
                  : null;
              })
            );
        })
      );
  }

}
