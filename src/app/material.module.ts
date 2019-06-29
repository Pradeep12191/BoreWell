import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatSidenavModule, MatExpansionModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatButtonModule, MatMenuModule, MatSelectModule, MatTreeModule, MatIconModule
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
        MatIconModule
    ]
})
export class MaterialModule {

}