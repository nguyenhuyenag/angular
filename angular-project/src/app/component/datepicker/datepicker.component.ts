import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { DateUtils } from 'src/app/util/dateutils';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor(private dateUtils: DateUtils, config: NgbDatepickerConfig, calendar: NgbCalendar) {
    /*-- config select box year --*/
    // config.minDate = {year: 1900, month: 1, day: 1};    // nam bat dau
    // config.maxDate = {year: 2199, month: 12, day: 31};  // nam ket thuc
    // config.outsideDays = 'hidden';

    // weekends are disabled
    // config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
  }

  form = new FormGroup({
    fromDay: new FormControl(this.dateUtils.getFirstDayOfMonth()),
    toDay: new FormControl(this.dateUtils.getLastDayOfMonth())
  });

  get f() { return this.form.controls; }

  dateByFormat: string;

  format = "DD/MM/YYYY HH:mm:ss";


  ngOnInit() {

    // this.dateByFormat = this.dateUtils.getDateByFormat(this.format);

  }

}
