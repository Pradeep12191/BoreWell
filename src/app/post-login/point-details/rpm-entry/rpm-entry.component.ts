import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatRadioChange, MatStepper } from '@angular/material';
import { RpmEntryConfirmDialogComponent } from './rpm-entry-confirm-dialog/rpm-entry-confirm-dialog.component';
import { MediaObserver } from '@angular/flex-layout';
import { RpmEntryService } from './rpm-entry.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Agent } from './models/Agent';
import { Feet } from './models/Feet';
import { CasingDetail } from './models/CasingDetail';
import { Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    styleUrls: ['./rpm-entry.component.scss'],
    templateUrl: './rpm-entry.component.html'
})
export class RpmEntryComponent implements OnInit {
    todayDate = new Date();
    appearance;
    routeSubscription: Subscription;
    agents: Agent[] = [];
    form: FormGroup;
    boreChangeSubscription: Subscription;
    selectedBoreType = 'newBore';
    selectedAgentId;
    totalCasingAmt = 0;
    totalFeetAmt = 0;
    totalFlushingAmt = 0;
    totalWeldingAmt = 0;
    totalDieselAmt = 0;
    totalAdvance = 0;
    apperance;
    rpmEntryPostUrl;
    @ViewChild('stepper', {static: false}) stepper: MatStepper;
    public casingTypes = [
        { name: 'PVC 7 Inch', depthKey: 'pvc7Depth', depthCtrlKey: 'pvc7Inch', depthRateCasingKey: 'inch7DepthRate', amtKey: 'pvc7Amt', depthRateKey: 'pvc7DepthRate' },
        { name: 'PVC 10 Inch', depthKey: 'pvc10Depth', depthCtrlKey: 'pvc10Inch', depthRateCasingKey: 'inch10DepthRate', amtKey: 'pvc10Amt', depthRateKey: 'pvc10DepthRate' },
        { name: 'PVC 12 Inch', depthKey: 'pvc12Depth', depthCtrlKey: 'pvc12Inch', depthRateCasingKey: 'inch12DepthRate', amtKey: 'pvc12Amt', depthRateKey: 'pvc12DepthRate' },
        { name: 'MS, Medium', depthKey: 'msMediumDepth', depthCtrlKey: 'msMedium', depthRateCasingKey: 'msMediumDepthRate', amtKey: 'msMediumAmt', depthRateKey: 'msMediumDepthRate' },
        { name: 'MS, Heavy', depthKey: 'msHeavyDepth', depthCtrlKey: 'msHeavy', depthRateCasingKey: 'msHeavyDepthRate', amtKey: 'msHeavyAmt', depthRateKey: 'msHeavyDepthRate' }
    ]
    constructor(
        private dialog: MatDialog,
        private media: MediaObserver,
        private route: ActivatedRoute,
        private res: RpmEntryService,
        private fb: FormBuilder,
        private config: ConfigService,
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        this.route.data.subscribe(data => {
            if (data) {
                if (data.agents) {
                    this.agents = data.agents
                }
            }
        })

        this.appearance = this.config.getConfig('formAppearance');
        this.rpmEntryPostUrl = this.config.getAbsoluteUrl('RPMEnty');

        this.boreChangeSubscription = this.res.boreChangeObs().subscribe(boreType => {
            this.selectedBoreType = boreType
        })

        this.res.agentChangeObs().subscribe(agentId => {
            this.selectedAgentId = agentId;
        })

    }

    ngOnInit() {
        this.buildRpmEntryForm();
    }



    openConfirmDialog() {
        const payload = this.getPayload();
        const agent = this.getAgent();
        console.log(JSON.stringify(payload, null, 2));
        // return console.log(this.form.value);
       const dialogRef =  this.dialog.open(RpmEntryConfirmDialogComponent, {
            panelClass: 'confirm-dialog',
            height: this.media.isActive('lt-md') ? '100vh' : 'auto',
            width: this.media.isActive('lt-md') ? '100vw' : '80vw',
            maxWidth: this.media.isActive('lt-md') ? '100vw' : '80vw',
            position: { top: '0px' },
            data: {
                formValue: this.form.value,
                payload,
                agentName: agent.name
            }
        })

        dialogRef.afterClosed().subscribe(() => {
            this.stepper.reset()
        })
    }

    onBoreTypeChange(event: MatRadioChange) {
        this.res.boreChange(event.value);
    }

    buildRpmEntryForm() {
        this.form = this.fb.group({
            pointNo: ['', Validators.required],
            boreType: 'newBore',
            date: '',
            info: this.fb.group({
                agent: this.fb.group({
                    id: ['', Validators.required],
                    village: ''
                }),
                party: this.fb.group({
                    name: '',
                    mobile: ''
                }),
            }),
            depth: this.fb.group({
                casing: this.fb.group({
                    pvc7Inch: '',
                    pvc10Inch: '',
                    pvc12Inch: '',
                    msMedium: '',
                    msHeavy: '',
                }),
                rpm: this.fb.group({
                    start: '',
                    end: '',
                    total: ''
                }),
                feetage: '',
                bits: this.fb.array([this.res.buildBitForm()]),
                hammer: '',
                drilling: this.fb.group({
                    depth: ''
                }),
                welding: ''
            }),
            other: this.fb.group({
                diesel: this.fb.group({
                    bunkName: '',
                    bunkArea: '',
                    perLiterAmt: '',
                    totalLiter: '',
                    totalAmt: ''
                }),
                advance: this.fb.group({
                    advance: '',
                    remarks: ''
                }),
                soil: this.fb.group({
                    loose: this.fb.group({
                        from: '',
                        to: ''
                    }),
                    boulder: this.fb.group({
                        from: '',
                        to: ''
                    })
                })
            }),
            totalDepth: ''
        })
    }

    private getUpdatedFeets() {
        const agent = this.getAgent();
        const updatedFeets: Feet[] = [];
        let totalFeet = 0;
        if (this.selectedBoreType === 'newBore') {
            totalFeet = this.form.get('depth.drilling.depth').value
        } else {
            totalFeet = this.form.get('depth.drilling.end').value
        }
        console.log(agent);

        totalFeet = totalFeet ? +totalFeet : 0;

        agent.feets.forEach((feet, index) => {
            let startFeet = feet.startFeet
            if (startFeet > 0) {
                startFeet -= 1;
            }
            if (totalFeet > 0) {
                if (totalFeet >= feet.endFeet) {
                    updatedFeets.push(feet);
                } else if (totalFeet > startFeet && totalFeet < feet.endFeet) {
                    const updatedFeetDiff = totalFeet - startFeet;
                    const updatedTotalAmt = updatedFeetDiff * feet.amtPerFeet;
                    updatedFeets.push({
                        amtPerFeet: feet.amtPerFeet,
                        endFeet: totalFeet,
                        feetDiff: updatedFeetDiff,
                        startFeet: feet.startFeet,
                        totalAmt: updatedTotalAmt,
                    })
                }
            }
        });

        if (this.selectedBoreType === 'reBore') {
            let flusingDepth = this.form.get('depth.drilling.flushing').value;
            flusingDepth = flusingDepth ? +flusingDepth : 0;

            updatedFeets.forEach((feet) => {
                let startFeet = feet.startFeet;

                if (startFeet > 0) {
                    startFeet -= 1;
                }
                if (flusingDepth >= feet.endFeet) {
                    // mark the feet as flused
                    feet.isFlushed = true;
                } else if (flusingDepth > startFeet && flusingDepth <= feet.endFeet) {
                    let newStartFeet = 0
                    if (flusingDepth > 0) {
                        newStartFeet = flusingDepth + 1;
                    }
                    feet.startFeet = newStartFeet;

                    if (newStartFeet > 0) {
                        newStartFeet -= 1;
                    }
                    const feetDiff = feet.endFeet - newStartFeet;
                    const amt = feet.amtPerFeet * feetDiff;

                    feet.feetDiff = feetDiff;
                    feet.totalAmt = amt;
                }
            })
        }
        this.totalFeetAmt = updatedFeets.filter(feet => !feet.isFlushed)
            .map(feet => feet.totalAmt)
            .reduce((total, amt) => total + amt, 0);
        return updatedFeets.map(feet => {
            return {
                startFeet: feet.startFeet.toString(),
                endFeet: feet.endFeet.toString(),
                feetDiff: feet.feetDiff.toString(),
                amtPerFeet: feet.amtPerFeet.toString(),
                totalAmt: feet.totalAmt
            }
        })
    }

    private getUpdatedCasing() {
        const updatedCasingDetails: CasingDetail = {};
        let casing;
        let totalCasingAmt = 0;
        const agent = this.getAgent();
        if (this.selectedBoreType === 'newBore') {
            casing = agent.newBore.casing;
        } else {
            casing = agent.reBore.casing;
        }

        this.casingTypes.forEach((casingType, index) => {
            if (casing[casingType.depthRateCasingKey]) {
                let casingDepth = this.form.value.depth.casing[casingType.depthCtrlKey];
                if (casingDepth) {
                    casingDepth = casingDepth ? +casingDepth : 0
                    let casingDepthRate = casing[casingType.depthRateCasingKey] ? + casing[casingType.depthRateCasingKey] : 0;
                    let casingAmt = casingDepthRate * casingDepth;
                    totalCasingAmt += casingAmt;
                    updatedCasingDetails[casingType.depthKey] = casingDepth.toString();
                    updatedCasingDetails[casingType.depthRateKey] = casingDepthRate.toString();
                    updatedCasingDetails[casingType.amtKey] = casingAmt.toString();
                }
            }
        })
        this.totalCasingAmt = totalCasingAmt;
        console.log(updatedCasingDetails);
        return updatedCasingDetails;
    }

    private calcTotalAmt() {
        // total casing amt + total feet amt + advance + diesel + flushing charge(re-bore) + weldingAmt;
        let overallAmt = 0;
        let totalFlusingAmt = 0;
        const agent = this.getAgent();
        const weldingCount = this.form.get('depth.welding').value ? +this.form.get('depth.welding').value : 0;
        let perWeldingAmt = agent.newBore.amtPerWelding ? +agent.newBore.amtPerWelding : 0;
        let allowance = agent.newBore.allowance ? +agent.newBore.allowance : 0;

        // const casingDetails = this.

        if (this.selectedBoreType === 'reBore') {
            const flusingDepth = this.form.get('depth.drilling.flushing').value ? +this.form.get('depth.drilling.flushing').value : 0;
            const flushingAmt = agent.reBore.flushingChange ? +agent.reBore.flushingChange : 0;
            totalFlusingAmt = flusingDepth * flushingAmt;
            this.totalFlushingAmt = totalFlusingAmt;

            perWeldingAmt = agent.reBore.amtPerWelding ? + agent.reBore.amtPerWelding : 0;
            allowance = agent.reBore.allowance ? +agent.reBore.allowance : 0;
        }

        this.totalWeldingAmt = perWeldingAmt * weldingCount;
        this.totalDieselAmt = this.form.get('other.diesel.totalAmt').value ? + this.form.get('other.diesel.totalAmt').value : 0;
        this.totalAdvance = this.form.get('other.advance.advance').value ? +this.form.get('other.advance.advance').value : 0;


        overallAmt = this.totalCasingAmt + this.totalFeetAmt + totalFlusingAmt + this.totalWeldingAmt + this.totalDieselAmt + allowance;
        return overallAmt;
    }

    private getAgent() {
        const agent = this.agents.find(agent => agent.agent_id === this.selectedAgentId);

        agent.feets = agent.newBore.particulars.map(feet => {
            let startFeet = feet.startFeet && feet.startFeet !== 'null' ? +feet.startFeet : 0;
            let actualStartFeet = startFeet;
            let endFeet = feet.endFeet ? +feet.endFeet : 0;
            let amtPerFeet = feet.perFeet ? +feet.perFeet : 0;
            let totalAmt = feet.amount ? +feet.amount : 0;
            let feetDiff = 0;
            let feetMap: Feet;

            if (startFeet > 0) {
                startFeet -= 1;
            }

            feetDiff = endFeet - startFeet


            feetMap = {
                startFeet: actualStartFeet,
                endFeet,
                feetDiff,
                amtPerFeet,
                totalAmt
            }

            return feetMap;
        })

        return agent
    }

    private getPayload() {
        const casingDetails = this.getUpdatedCasing();
        const feets = this.getUpdatedFeets();
        const overallAmt = this.calcTotalAmt();
        const formValue = this.form.value;
        const agent = this.getAgent();
        let amtPerWelding = agent.newBore.amtPerWelding;
        let allowance = agent.newBore.allowance;
        if (this.selectedBoreType === 'reBore') {
            amtPerWelding = agent.reBore.amtPerWelding;
            allowance = agent.reBore.allowance
        }

        const payload = {
            pointno: formValue.pointNo,
            date: formValue.date ? (formValue.date as Moment).format('DD-MM-YYYY') : null,
            boreType: formValue.boreType,
            partyName: formValue.info.party.name,
            partyMobile: formValue.info.party.mobile,
            agentId: formValue.info.agent.id,
            agentVillage: formValue.info.agent.village,
            agentName: agent.name,
            agentMobile: agent.mobileNumber,
            pvc7Depth: casingDetails.pvc7Depth ? casingDetails.pvc7Depth : '',
            pvc7DepthRate: casingDetails.pvc7DepthRate ? casingDetails.pvc7DepthRate : '',
            pvc7Amt: casingDetails.pvc7Amt ? casingDetails.pvc7Amt : '',
            pvc10Depth: casingDetails.pvc10Depth ? casingDetails.pvc10Depth : '',
            pvc10DepthRate: casingDetails.pvc10DepthRate ? casingDetails.pvc10DepthRate : '',
            pvc10Amt: casingDetails.pvc10Amt ? casingDetails.pvc10Amt : '',
            pvc12Depth: casingDetails.pvc12Depth ? casingDetails.pvc12Depth : '',
            pvc12DepthRate: casingDetails.pvc12DepthRate ? casingDetails.pvc12DepthRate : '',
            pvc12Amt: casingDetails.pvc12Amt ? casingDetails.pvc12Amt : '',
            msMediumDepth: casingDetails.msMediumDepth ? casingDetails.msMediumDepth : '',
            msMediumDepthRate: casingDetails.msMediumDepthRate ? casingDetails.msMediumDepthRate : '',
            msMediumAmt: casingDetails.msMediumAmt ? casingDetails.msMediumAmt : '',
            msHeavyDepth: casingDetails.msHeavyDepth ? casingDetails.msHeavyDepth : '',
            msHeavyDepthRate: casingDetails.msHeavyDepthRate ? casingDetails.msHeavyDepthRate : '',
            msHeavyAmt: casingDetails.msHeavyAmt ? casingDetails.msHeavyAmt : '',
            feets,
            bits: formValue.depth.bits,
            drilling: formValue.depth.drilling,
            diesel: formValue.other.diesel,
            advance: formValue.other.advance,
            soilDetails: formValue.other.soil,
            totalCasingAmt: this.totalCasingAmt.toString(),
            totalFeetAmt: this.totalFeetAmt.toString(),
            welding: formValue.depth.welding,
            allowance,
            startRpm: formValue.depth.rpm.start,
            endRpm: formValue.depth.rpm.end,
            totalRpm: formValue.depth.rpm.total,
            totalFeetPerHour: formValue.depth.feetage,
            amtPerWelding,
            weldingAmt: this.totalWeldingAmt.toString(),
            overallAmt: overallAmt.toString()
        }

        if (this.selectedBoreType === 'reBore') {
            payload['totalFlusingAmt'] = this.totalFlushingAmt
        }

        return payload
    }
}