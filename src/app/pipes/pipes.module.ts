import { NgModule } from '@angular/core';
import { NullFilterPipe } from './nullFilter.pipe';

@NgModule({
    declarations: [
        NullFilterPipe
    ],
    exports: [
        NullFilterPipe
    ]
})
export class PipesModule {

}