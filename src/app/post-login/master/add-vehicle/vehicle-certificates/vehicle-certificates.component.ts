import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'vehicle-certificates',
    templateUrl: './vehicle-certificates.component.html',
    styleUrls: ['./vehicle-certificates.component.scss']
})
export class VehicleCertificatesComponent {
    @Input() form: FormGroup;
}