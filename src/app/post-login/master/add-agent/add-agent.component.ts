import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddAgentService } from './add-agent.service';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';
import { MatStepper } from '@angular/material';

@Component({
    templateUrl: 'add-agent.component.html',
    styleUrls: ['add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
    agentForm: FormGroup;
    addAgentUrl;
    @ViewChild(MatStepper, { static: false }) stepper: MatStepper;
    constructor(
        private fb: FormBuilder,
        private aes: AddAgentService,
        private config: ConfigService,
        private http: HttpClient,
        private toastr: ToastrService,
        private common: CommonService
    ) {
        const url = this.config.getUrl('addAgent');
        const baseUrl = this.config.getConfig('apiUrl');
        this.addAgentUrl = baseUrl + url;
    }

    ngOnInit() {
        this.agentForm = this.fb.group({
            info: this.fb.group({
                officeName: null,
                name: [null, Validators.required],
                mobileNumber: [null, Validators.required],
                area: null,
                city:[null, Validators.required],
                state: [null, Validators.required],
                type: [null, Validators.required],
                // // address: null,
                
            }),
            newBore: this.fb.group({
                particulars: this.fb.array([this.aes.buildPointForm()]),
                casing: this.buildCasingGroup(),
                amtPerWelding: '',
                allowance: ''
            }),
            reBore: this.fb.group({
                flushingChange: '',
                addlReDrillingCharge: '',
                casing: this.buildCasingGroup(),
                amtPerWelding: '',
                allowance: ''
            }),
            commission: this.fb.group({
                type: null,
                perFeet: null,
                casingType: null,
                casingPerFeet: null,
                casingPaymentType: null
            })
        });
    }

    resetForm() {
        this.agentForm.reset({
            point: {
                particulars: [{ startFeet: '0' }]
            }
        });
    }

    saveAgent() {

        const agentFormValue = this.agentForm.value;
        const agentObj = {
            officeName: agentFormValue.info.officeName,
            name: agentFormValue.info.name,
            city: agentFormValue.info.city,
            area: agentFormValue.info.area,
            state: agentFormValue.info.state,
            type: agentFormValue.info.type,
            address: agentFormValue.info.address,
            mobileNumber: agentFormValue.info.mobileNumber,
            // points: agentFormValue.newBore.particulars,
            newBore: agentFormValue.newBore,
            reBore: agentFormValue.reBore
            // commission_type: agentFormValue.commission.type,
            // commission_perFeet: agentFormValue.commission.perFeet,
            // commission_casingType: agentFormValue.commission.casingType,
            // commission_casingPerFeet: agentFormValue.commission.casingPerFeet,
            // commission_casingPaymentType: agentFormValue.commission.casingPaymentType,
        }
        console.log(JSON.stringify(agentObj, null, 2))

        if (this.addAgentUrl) {
            this.http.post(this.addAgentUrl, agentObj).subscribe((response) => {
                this.toastr.success('Agent Added Sucessfully', null, { timeOut: 1500 });
                this.stepper.reset();
                this.resetForm();
                this.common.scrollTop();
            }, (err) => {
                if (err) {
                    this.toastr.error('Error while saving Agent', null, { timeOut: 1500 });
                }
            });
        }
    }

    private buildCasingForm() {
        return this.fb.group({
            depth: '',
            depthRate: '',
            amount: ''
        })
    }

    private buildCasingGroup() {
       return this.fb.group({
            inch7DepthRate: '',
            inch10DepthRate: '',
            inch12DepthRate: '',
            msMediumDepthRate: '',
            msHeavyDepthRate: '',
        })
    }
}