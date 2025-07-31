
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UI } from '../ui-utils';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-types',
  standalone: true,
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule,],
  encapsulation: ViewEncapsulation.None,
})
export class TypesComponent {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  checkDuplicateResult: string = "";
  checkDuplicates(inpt: string, existingTypes: string[]) {
    if (inpt.length <= 0) {
      this.checkDuplicateResult = "";
      return;
    }
    const checkDuplicateResultArr = existingTypes.filter(value => { return UI.StringHelper.fuzzysearch(inpt, value) });
    this.checkDuplicateResult = checkDuplicateResultArr.join(', ');
  }

  checkValue() {
    const values = this.checkDuplicateResult.split(", ");
    const newType = this.datasource.newType;

    if (newType && typeof newType === 'string') {
      const lowercaseNewType = newType.toLowerCase();
      return values.some(value => value.toLowerCase() === lowercaseNewType);
    }

    return false;
  }
}
