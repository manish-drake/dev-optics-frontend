import { Injectable } from "@angular/core";
import { NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UI } from "./ui-utils";

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      return UI.DateHelper.viewDateFormat(value);
    }
    else
      return UI.DateHelper.viewDateToday();
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (date) {
      return UI.DateHelper.apiDateFormat(new NgbDate(date.year, date.month, date.day));
    }
    else
      return UI.DateHelper.apiDateToday();
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  static format: string | null = "mm-dd-yyyy";
  
  parse(value: string): NgbDateStruct | null {
    console.log(value)
    if (value) {
      return UI.DateHelper.stringToDate(value);
    }
    else
      return UI.DateHelper.stringToDateToday();
  }

  format(date: NgbDateStruct | null): string {
    if(!CustomDateParserFormatter.format)
    {
      //Get date-format from settings here
    }

    if (date) {
      return UI.DateHelper.dateToString(date, CustomDateParserFormatter.format);
    }
    else
      return UI.DateHelper.dateToStringToday(CustomDateParserFormatter.format);
  }
}