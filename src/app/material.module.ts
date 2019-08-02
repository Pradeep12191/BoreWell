import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatSidenavModule, MatExpansionModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatButtonModule, MatMenuModule, MatSelectModule, MatTreeModule, MatIconModule, MatDatepickerModule, MatCheckboxModule, MatProgressSpinnerModule, MatCardModule, MatStepperModule, MatSnackBarModule, MatDividerModule, MatDialogModule, MatTableModule
} from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    exports: [
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatTreeModule,
        MatIconModule,
        MatExpansionModule,
        MatDatepickerModule,
        MomentDateModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatStepperModule,
        MatSnackBarModule,
        MatDividerModule,
        MatDialogModule,
        MatTableModule
    ],
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class MaterialModule {

}