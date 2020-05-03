import { Component, forwardRef, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

const MONTH_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthPickerComponent),
    multi: true
}


@Component({
    selector: 'month-picker',
    templateUrl: './month-picker.component.html',
    styleUrls: ['./month-picker.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        MONTH_PICKER_VALUE_ACCESSOR,
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class MonthPickerComponent implements ControlValueAccessor, OnInit {
    monthCtrl = new FormControl('');
    onChange: (_) => void;
    onTouched: (_) => void;
    constructor() {

    }

    ngOnInit() {

    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        let ctrlValue = this.monthCtrl.value;
        if (!ctrlValue) {
            ctrlValue = moment();
        }
        ctrlValue.month(normalizedMonth.month());
        this.monthCtrl.setValue(ctrlValue);
        if (this.onChange) {
            this.onChange(ctrlValue);
        }
        datepicker.close();
    }

    writeValue(value) {
        this.monthCtrl.setValue(value)
    }

    registerOnChange(onChange) {
        this.onChange = onChange
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}