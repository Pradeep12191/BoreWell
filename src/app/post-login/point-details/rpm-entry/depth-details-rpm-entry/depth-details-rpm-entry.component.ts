import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'depth-details-rpm',
    templateUrl: './depth-details-rpm-entry.component.html',
    styleUrls: ['./depth-details-rpm-entry.component.scss']
})
export class DepthDetailsRpmEntryComponent {
    @Input() form: FormGroup; 
}