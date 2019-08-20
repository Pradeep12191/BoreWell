import { Component, Input } from '@angular/core';

@Component({
    selector: 'point-report-view',
    templateUrl: './point-report-view.component.html',
    styleUrls: ['./point-report-view.component.scss']
})
export class PointReportViewComponent {
    @Input() point;
    @Input() viewOnly;
}