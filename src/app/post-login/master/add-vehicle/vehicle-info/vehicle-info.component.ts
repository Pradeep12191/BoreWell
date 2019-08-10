import { Component, Input, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '../../../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSelect, MatFormFieldControl, MatInput } from '@angular/material';
import { FocusableControl } from '../../../../interfaces/FocusableControl';

@Component({
    selector: 'vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls: ['./vehicle-info.component.scss']
})
export class VehicleInfoComponent implements OnDestroy {
    @Input() form: FormGroup;
    private routeSubscription: Subscription;
    @ViewChildren('requiredControl') requiredControls: QueryList<MatSelect>;

    appearance;
    types = [
        { value: '1', display: 'Rig' },
        { value: '2', display: 'Support' },
        { value: '3', display: 'Others' },
    ]
    boreSizes = [
        { value: '1', display: '4 1/2' },
        { value: '1', display: '6 1/2' },
    ]
    constructor(
        private config: ConfigService,
        private route: ActivatedRoute,
        public el: ElementRef
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if(data.vehicleTypes){
                    this.types = data.vehicleTypes
                }
                if(data.boreSizes){
                    this.boreSizes = data.boreSizes
                }
            }
        })
    }

    ngOnDestroy() {
        if (this.routeSubscription) { this.routeSubscription.unsubscribe(); }
    }
}