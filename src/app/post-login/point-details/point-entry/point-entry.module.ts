import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointEntryComponent } from './point-entry.component';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PointEntryRoutingModule } from './point-entry-routing.module';
import { PointEntryDetailsComponent } from './point/point-entry-details/point-entry-details.component';
import { OtherChargesComponent } from './point/other-charges/other-charges.component';
import { PointEntryService } from './point-entry.service';
import { BitDetailsComponent } from './point/bit-details/bit-details.component';
import { HammerDetailsComponent } from './point/hammer-details/hammer-details.component';
import { SharedModule } from '../../../shared.module';
import { PointEntryResolve } from '../../../guards/resolveGuard/point-entry.guard';
import { DirectiveModule } from '../../../directives/directive.module';
import { PointInfoComponent } from './point-info/point-info.component';
import { PointOtherDetailsComponent } from './point-other-details/point-other-details.component';
import { PointComponent } from './point/point.component';
import { AgentListResolver } from '../../../guards/resolveGuard/agent/agent-list.resolver';
import { activeControlsPipe } from './activeControls.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PointEntryRoutingModule,
        SharedModule,
        DirectiveModule
    ],
    declarations: [
        PointEntryComponent,
        PointEntryDetailsComponent,
        OtherChargesComponent,
        BitDetailsComponent,
        HammerDetailsComponent,
        PointInfoComponent,
        PointOtherDetailsComponent,
        PointComponent,
        activeControlsPipe
    ],
    providers: [
        PointEntryService,
        PointEntryResolve,
        AgentListResolver
    ]
})
export class PointEntryModule {

}