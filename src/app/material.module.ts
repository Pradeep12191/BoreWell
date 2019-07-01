import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatSidenavModule, MatExpansionModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatButtonModule, MatMenuModule, MatSelectModule, MatTreeModule, MatIconModule, MatDatepickerModule
} from '@angular/material';

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
    ]
})
export class MaterialModule {

}