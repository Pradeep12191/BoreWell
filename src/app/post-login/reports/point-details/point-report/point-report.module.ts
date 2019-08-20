import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { SharedModule } from '../../../../shared.module';
import { CommonModule } from '@angular/common';
import { PointReportRoutingModule } from './point-report-routing.module';
import { PointReportComponent } from './point-report.component';
import { ExpandTableModule } from '../../../../expand-table/expand-table.module';
import { PointReportReolver } from '../../../../guards/resolveGuard/reports/point-report/point-report.resolver';
import { PipesModule } from '../../../../pipes/pipes.module';
import { PointReportViewComponent } from './point-report-view/point-report-view.component';
import { DirectiveModule } from '../../../../directives/directive.module';

@NgModule({
    imports: [
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        CommonModule,
        ExpandTableModule,
        PointReportRoutingModule,
        PipesModule,
        DirectiveModule
    ],
    declarations: [
        PointReportComponent,
        PointReportViewComponent
    ],
    providers: [
        PointReportReolver
    ]
})
export class PointReportModule {

}