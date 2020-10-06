import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// add `.custom-select{width: 93px !important;}`  to  `styles.css`
const I18N_VALUES = {
    'vi': {
        weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        months: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ]
    }
    // other languages you would support
};

// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
    language = 'vi';
}
// Define custom service providing the months and weekdays translations
@Injectable()
export class DatepickerI18n extends NgbDatepickerI18n {

    constructor(private i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this.i18n.language].weekdays[weekday - 1];
    }

    getMonthShortName(month: number): string {
        return I18N_VALUES[this.i18n.language].months[month - 1];
    }

    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }

}
