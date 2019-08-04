import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ConfigService } from '../../../../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddVehicleService } from '../../add-vehicle.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'vehicle-permit-details',
    templateUrl: './vehicle-permit-details.component.html',
    styleUrls: ['./vehicle-permit-details.component.scss']
})
export class VehiclePermitDetailsComponent implements OnDestroy {
    @Input() form: FormGroup;
    get permitFormArray() {
        return this.form.get('permits') as FormArray
    }
    appearance;
    states;
    routeDataSubscription: Subscription;

    constructor(
        private config: ConfigService,
        private route: ActivatedRoute,
        private avs: AddVehicleService,
        private snackbar: MatSnackBar
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeDataSubscription = this.route.data.subscribe((data) => {
            this.states = data.states;
        })
    }

    ngOnDestroy() {
        if (this.routeDataSubscription) { this.routeDataSubscription.unsubscribe(); }
    }

    addPermit() {
        let lastCtrl = this.permitFormArray.at(this.permitFormArray.length - 1);
        const lastState = lastCtrl.get('state').value;
        const lastValid = lastCtrl.get('validUpto').value;

        if (this.permitFormArray.valid) {
            this.permitFormArray.push(this.avs.permitDetailsForm())
        } else {
            this.snackbar.open('Please Fill Permit Detail', null, { duration: 1000 })
        }

    }

    removePermit(index){
        this.permitFormArray.removeAt(index);
    }

}