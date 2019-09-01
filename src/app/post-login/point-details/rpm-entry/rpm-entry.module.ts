import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DirectiveModule } from '../../../directives/directive.module';
import { SharedModule } from '../../../shared.module';
import { MaterialModule } from '../../../material.module';
import { RpmEntryComponent } from './rpm-entry.component';
import { RpmEntryRoutingModule } from './rpm-entry-routing.module';
import { AgentListResolver } from '../../../guards/resolveGuard/agent/agent-list.resolver';
import { AgentInfoRpmEntryComponent } from './agent-info-rpm-entry/agent-info-rpm-entry.component';
import { CasingDetailsRpmComponent } from './depth-details-rpm-entry/casing-details-rpm/casing-details-rpm.component';
import { BitDetailsRpmEntryComponent } from './depth-details-rpm-entry/bit-details-rpm-entry/bit-details-rpm-entry.component';
import { RpmDetailsRpmEntryComponent } from './depth-details-rpm-entry/rpm-details-rpm-entry/rpm-details-rpm-entry.component';
import { DepthDetailsRpmEntryComponent } from './depth-details-rpm-entry/depth-details-rpm-entry.component';
import { OtherDetailsRpmEntryComponent } from './other-details-rpm-entry/other-details-rpm-entry.component';
import { RpmEntryConfirmDialogComponent } from './rpm-entry-confirm-dialog/rpm-entry-confirm-dialog.component';
import { RpmEntryService } from './rpm-entry.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        RpmEntryRoutingModule,
        SharedModule,
        DirectiveModule
    ],
    declarations: [
        RpmEntryComponent,
        AgentInfoRpmEntryComponent,
        CasingDetailsRpmComponent,
        BitDetailsRpmEntryComponent,
        RpmDetailsRpmEntryComponent,
        DepthDetailsRpmEntryComponent,
        OtherDetailsRpmEntryComponent,
        RpmEntryConfirmDialogComponent
    ],
    entryComponents: [
        RpmEntryConfirmDialogComponent
    ],
    providers: [
        AgentListResolver,
        RpmEntryService
    ]
})
export class RpmEntryModule {

}