import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtils {

    private now = new Date();
    private year = this.now.getFullYear();
    private month = this.now.getMonth() + 1;

    public getYear() {
        return this.year;
    }

    public getFirstDayOfMonth() {
        let firstDay = new Date(this.year, this.month - 1, 1);
        return { year: this.year, month: this.month, day: firstDay.getDate() };
    }

    public getLastDayOfMonth() {
        let lastDayOfMonth = new Date(this.year, this.month, 0);
        return { year: this.year, month: this.month, day: lastDayOfMonth.getDate() };
    }

}
