import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MonthPickerComponent],
    imports: [
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        MonthPickerComponent,
        TranslateModule
    ]
})
export class SharedModule {

}