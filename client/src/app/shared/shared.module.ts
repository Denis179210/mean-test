import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { SearchComponent } from './components/search/search.component';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';
import { PromptComponent } from './components/prompt/prompt.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    SearchComponent,
    PopupMenuComponent,
    PromptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    PopupMenuComponent,
    PromptComponent

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    SearchComponent,
    PopupMenuComponent,
    PromptComponent
  ]
})
export class SharedModule { }
