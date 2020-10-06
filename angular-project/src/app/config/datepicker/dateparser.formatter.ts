import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {

    private ddIndex: number;
    private mmIndex: number;
    private yyIndex: number;
    private separator: string;

    private anioSumar = 0;
    private mask = "dd/MM/yyyy"; // important

    set Mask(value: string) { this.mask = value; }

    constructor() {
        super();
        this.separator = this.mask.indexOf('-') >= 0 ? '-' : this.mask.indexOf('.') >= 0 ? '.' : '/';
        let part = this.mask.split(this.separator);
        this.ddIndex = part.indexOf('dd');
        this.mmIndex = part.indexOf('MM');
        this.yyIndex = part.indexOf('yyyy');
        if (this.yyIndex < 0) {
            this.yyIndex = part.indexOf('yy');
            this.anioSumar = 2000;
        }
    };

    padNumber(value: number) {
        if (this.isNumber(value)) {
            return `0${value}`.slice(-2);
        }
        return "";
    }

    isNumber(value: any): boolean {
        return !isNaN(this.toInteger(value));
    }

    toInteger(value: any): number {
        return parseInt(`${value}`, 10);
    }

    parse(value: string): NgbDateStruct {
        if (value) {
            value = value.replace(/\.|\/|-/g, this.separator);
            const dateParts = value.trim().split(this.separator);
            if (dateParts.length != 3) {
                return { year: 0, month: 0, day: 0 };
            }
            let mes = 0, dia = 0, anio = 0;
            if (this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
                dia = this.ddIndex == 0 ? this.toInteger(dateParts[0]) : this.ddIndex == 1 ? this.toInteger(dateParts[1]) : this.ddIndex == 2 ? this.toInteger(dateParts[2]) : 0;
                mes = this.mmIndex == 0 ? this.toInteger(dateParts[0]) : this.mmIndex == 1 ? this.toInteger(dateParts[1]) : this.mmIndex == 2 ? this.toInteger(dateParts[2]) : 0;
                anio = this.yyIndex == 0 ? (dateParts[0].length < 2) ? 0 : this.toInteger(dateParts[0]) + this.anioSumar : this.yyIndex == 1 ? (dateParts[1].length < 2) ? 0 : this.toInteger(dateParts[1]) + this.anioSumar : this.yyIndex == 2 ? (dateParts[2].length < 2) ? 0 : this.toInteger(dateParts[2]) + this.anioSumar : 0;
            }
            if (dia == 0 || mes == 0 || anio == 0) {
                return { year: 0, month: 0, day: 0 };
            }
            if (anio < 100) {
                anio = 2000 + anio;
            }
            return { year: anio, month: mes, day: dia };
        }
        return { year: 0, month: 0, day: 0 };
    }

    format(date: NgbDateStruct): string {
        let stringDate = "";
        if (date) {
            let stringDay = this.isNumber(date.day) ? this.padNumber(date.day) : "";
            let stringMonth = this.isNumber(date.month) ? this.padNumber(date.month) : "";
            let stringYear = this.isNumber(date.year) ? (date.year - this.anioSumar).toString() : "";
            stringDate = (stringDay) ? this.mask.replace("dd", stringDay) : this.ddIndex == 0 ? this.mask.replace("dd" + this.separator, '') : this.mask.replace(this.separator + "dd", '');
            stringDate = (stringMonth) ? stringDate.replace("MM", stringMonth) : this.mmIndex == 0 ? stringDate.replace("MM" + this.separator, '') : stringDate.replace(this.separator + "MM", '');
            if (this.anioSumar) {
                stringDate = (stringDay) ? stringDate.replace("yy", stringYear) : this.yyIndex == 0 ? stringDate.replace("yy" + this.separator, '') : stringDate.replace(this.separator + "yy", '');
            } else {
                stringDate = (stringDay) ? stringDate.replace("yyyy", stringYear) : this.yyIndex == 0 ? stringDate.replace("yyyy" + this.separator, '') : stringDate.replace(this.separator + "yyyy", '');
            }
        }
        return stringDate;
    }
}
