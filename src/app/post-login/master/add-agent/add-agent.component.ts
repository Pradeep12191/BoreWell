import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddAgentService } from './add-agent.service';
import { ConfigService } from '../../../services/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: 'add-agent.component.html',
    styleUrls: ['add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
    agentForm: FormGroup;
    addAgentUrl;
    constructor(
        private fb: FormBuilder,
        private aes: AddAgentService,
        private config: ConfigService,
        private http: HttpClient
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
                state: [null, Validators.required],
                type: [null, Validators.required],
                address: null,
                mobileNumber: null
            }),
            point: this.fb.group({
                particulars: this.fb.array([this.aes.buildPointForm()])
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
        this.agentForm.reset();
    }

    saveAgent() {

        const agentFormValue = this.agentForm.value;
        const agentObj = {
            officeName: agentFormValue.info.officeName,
            name: agentFormValue.info.name,
            state: agentFormValue.info.state,
            type: agentFormValue.info.type,
            address: agentFormValue.info.address,
            mobileNumber: agentFormValue.info.mobileNumber,
            points: agentFormValue.point.particulars,
            commission_type: agentFormValue.commission.type,
            commission_perFeet: agentFormValue.commission.perFeet,
            commission_casingType: agentFormValue.commission.casingType,
            commission_casingPerFeet: agentFormValue.commission.casingPerFeet,
            commission_casingPaymentType: agentFormValue.commission.casingPaymentType,
        }
        console.log(JSON.stringify(agentObj, null, 2))
        if (this.addAgentUrl) {
            this.http.post(this.addAgentUrl, agentObj).subscribe((response) => {
                if (response) {
                    console.log(JSON.stringify(response, null, 2))
                } else {
                    console.log('No Response')
                }
            });
        }
    }
}