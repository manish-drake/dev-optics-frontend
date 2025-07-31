// import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export namespace UI {
  // export class DateHelper {
  //   static apiDateFormat(date: NgbDate): string {
  //     const month: number = date.month;
  //     const year: number = date.year;
  //     const day: number = date.day;
  //     return `${("0000" + year).slice(-4)}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`
  //   }
  //   static disabledDate(stringDate:any){
  //     var date = new Date(stringDate);
  //     return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear());
  //   }
  //   static viewDateFormat(date: string): NgbDate {
  //     try {
  //       const month: number = +(date.slice(5, 7));
  //       const year: number = +(date.slice(0, 4));
  //       const day: number = +(date.slice(8, 10));
  //       return new NgbDate(year, month, day);
  //     } catch (error) {
  //       console.log("Bad date format", error);
  //       return new NgbDate(1776, 7, 4);
  //     }
  //   }
  //   static dateToString(date: NgbDateStruct, format: string): string {
  //     try {
  //       const month: number = date.month;
  //       const year: number = date.year;
  //       const day: number = date.day;
  //       switch (format) {
  //         case "mm-dd-yyyy":
  //           {
  //             return `${("00" + month).slice(-2)}-${("00" + day).slice(-2)}-${("0000" + year).slice(-4)}`
  //           }
  //         case "dd-mm-yyyy":
  //           {
  //             return `${("00" + day).slice(-2)}-${("00" + month).slice(-2)}-${("0000" + year).slice(-4)}`
  //           }
  //         default:
  //           {
  //             return `${("0000" + year).slice(-4)}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`
  //           }
  //       }
  //     } catch (error) {
  //       console.log("Bad date format", error);
  //       return "01-01-2000";
  //     }
  //   }
  //   static dateToStringToday(format: string): string {
  //     const today = new Date();
  //     return this.dateToString(new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate()), format);
  //   }
  //   static stringToDate(date: string): NgbDate {
  //     try {
  //       const month: number = +(date.slice(0, 2));
  //       const day: number = +(date.slice(3, 5));
  //       const year: number = +(date.slice(6, 10));
  //       return new NgbDate(year, month, day);
  //     } catch (error) {
  //       console.log("Bad date format", error);
  //       return new NgbDate(1776, 7, 4);
  //     }
  //   }
  //   static stringToDateToday(): NgbDate {
  //     const today = new Date();
  //     return new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  //   }

  //   static apiDateToday(): string {
  //     return UI.DateHelper.apiDateFormat(DateHelper.stringToDateToday())
  //   }
  //   static viewDateToday(): NgbDate {
  //     const today = new Date();
  //     return new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  //   }
    
  // }

  export class StringHelper {
    static fuzzysearch(needle: string, haystack: string) {
      const haystackLC = haystack.toLowerCase();
      const needleLC = needle.toLowerCase();

      const hlen = haystack.length;
      const nlen = needleLC.length;

      if (nlen > hlen) {
        return false;
      }
      if (nlen === hlen) {
        return needleLC === haystackLC;
      }
      outer: for (let i = 0, j = 0; i < nlen; i++) {
        const nch = needleLC.charCodeAt(i);

        while (j < hlen) {
          if (haystackLC.charCodeAt(j++) === nch) {
            continue outer;
          }
        }
        return false;
      }
      return true;
    }
  }

  export class JsonHelper {
    static JsonToString(json: any):string {
      if (typeof json === 'string' || json instanceof String) {
        return json as string;
      }
      else {
        try {
          return JSON.parse(json);
        } catch (error) {
          console.error(error);
          return "";
        }
      }
    }
  }
}