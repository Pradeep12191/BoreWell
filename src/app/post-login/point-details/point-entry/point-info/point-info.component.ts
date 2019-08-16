import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatFormField, MatInput } from '@angular/material';

@Component({
    selector: 'point-info',
    templateUrl: './point-info.component.html',
    styleUrls: ['./point-info.component.scss']
})
export class PointInfoComponent implements OnInit, OnDestroy {
    appearance;
    routeSubscription: Subscription
    @Input() form: FormGroup;
    @ViewChild('formField', { static: false }) formField: MatInput
    rigs;
    boreTypes;
    partyStates;
    partyCities;
    casingTypes;
    pipeTypes;
    pvcTypes;
    constructor(
        private config: ConfigService,
        private route: ActivatedRoute,
        public el: ElementRef
    ) {
        this.appearance = this.config.getConfig('formAppearance');
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data) {
                if (data.states) {
                    this.partyStates = data.states
                }
                if (data.rigs) {
                    this.rigs = data.rigs;
                }
                if (data.pipeTypes) {
                    this.pipeTypes = data.pipeTypes;
                }
                if (data.casingTypes) {
                    this.casingTypes = data.casingTypes;
                }
                if (data.boreTypes) {
                    this.boreTypes = data.boreTypes;
                }
                if (data.pvcTypes) {
                    this.pvcTypes = data.pvcTypes;
                }
            }
        })
    }

    ngOnInit() {
        console.log(this.form);
    }
    ngOnDestroy() {
        if (this.routeSubscription) { this.routeSubscription.unsubscribe(); }
    }
}