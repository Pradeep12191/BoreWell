import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { PointEntryService } from './point-entry.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/config.service';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import { MatStepper } from '@angular/material';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../../models/Agent';
import { Subscription } from 'rxjs';

const EMPTY_AGENT: Agent = {
  address: '',
  commission_casingPaymentType: '',
  commission_casingPerFeet: '',
  commission_casingType: '',
  commission_perFeet: '',
  commission_type: '',
  mobileNumber: '',
  name: '',
  officeName: '',
  points: [],
  state: '',
  type: '',
  user: ''
}

@Component({
  selector: 'app-point-entry',
  templateUrl: './point-entry.component.html',
  styleUrls: ['./point-entry.component.scss']
})
export class PointEntryComponent implements OnInit, OnDestroy {

  pointForm: FormGroup;
  rigs;
  boreTypes;
  partyStates;
  partyCities;
  casingTypes;
  pipes;
  appearance: string;
  pointUrl;
  agents;
  selectedAgent: Agent;
  agentChangeSubscription: Subscription;
  pointOptionChangeSubscription: Subscription;
  @ViewChild(MatStepper, { static: false }) stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private pes: PointEntryService,
    private http: HttpClient,
    private config: ConfigService,
    private toastr: ToastrService,
    private common: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appearance = this.config.getConfig('formAppearance');
    const baseUrl = this.config.getConfig('apiUrl');
    const url = this.config.getUrl('createpoint')
    this.pointUrl = baseUrl + url;
    this.route.data.subscribe((data) => {
      this.agents = data.agentList;
    })

    this.agentChangeSubscription = this.pes.agentChangeObs().subscribe(event => {
      this.selectedAgent = this.agents.find((agent) => agent.name === event.value);
    })
    this.pes.pointOptionChangeObs().subscribe(event => {
      if (event.optionName === 'self') {
        this.selectedAgent = null;
      }
    })
  }

  ngOnInit() {

    this.pointForm = this.fb.group({
      info: this.fb.group({
        rig: '',
        date: ['', Validators.required],
        boreType: '',
        partyName: '',
        partyState: '',
        partyCity: '',
        partyMobile: '',
        partyArea: '',
        casingType: '',
        pipeSelection: '',
        pipeType: '',
        pointNumber: ['', Validators.required]
      }),
      point: this.fb.group({
        agentType: 'agent',
        agentName: '',
        pointEntry: this.fb.group({
          totalFeet: '',
          reBoreFeet: '',
          reBoreAmtPerFeet: '150',
          reBoreAmt: '',
          feets: this.fb.array([this.pes.feetFormBuilder()]),
          totalFeetAmt: '',
          Pvc7Depth: '',
          Pvc7DepthRate: '',
          Pvc7Amt: '',
          Pvc10Depth: '',
          Pvc10DepthRate: '',
          Pvc10Amt: '',
          Pvc12Depth: '',
          Pvc12DepthRate: '',
          Pvc12Amt: '',
          MsMediumDepth: '',
          MsMediumDepthRate: '',
          MsMediumAmt: '',
          MsHeavyDepth: '',
          MsHeavyDepthRate: '',
          MsHeavyAmt: '',
          totalCasingAmt: '',
          allowance: '',
          welding: '',
          amtPerWelding: '',
          weldingAmt: ''
        }),
        otherCharges: this.fb.group({
          charges: this.fb.array([this.pes.chargeFormBuilder()]),
        }),
        bitDetails: this.fb.group({
          startRpm: '',
          endRpm: '',
          totalRpm: '',
          totalFeetPerHour: '',
          bits: this.fb.array([this.pes.bitFormBuilder()])
        }),
        hammerDetails: this.fb.group({
          hammers: this.fb.array([this.pes.hammerFormBuilder()])
        }),
      }),
      otherDetails: this.fb.group({
        overallTotalAmt: '',
        totalAmt: '',
        commissionAmt: '',
        remarks: ''
      })
    })

  }

  ngOnDestroy() {
    if (this.agentChangeSubscription) { this.agentChangeSubscription.unsubscribe(); }
    if (this.pointOptionChangeSubscription) { this.pointOptionChangeSubscription.unsubscribe(); }
  }

  resetForm() {
    this.pointForm.reset({
      point: {
        agentType: 'agent',
        pointEntry: {
          feets: [{ startFeet: '0' }],
          bitDetails: {
            startRpm: '0'
          }
        }
      }
    });
    this.agents = [...this.agents];
    this.pes.removeControls(this.pointForm.get('point.pointEntry.feets') as FormArray);
  }


  save() {
    if (this.pointForm.invalid) {
      return this.toastr.error('Please fill all required fields *', null, { timeOut: 1500 })
    }
    const formValue = this.pointForm.value;
    let selectedAgent: Agent = null
    if (this.selectedAgent) {
      selectedAgent = this.selectedAgent;
    } else {
      selectedAgent = EMPTY_AGENT;
    }
    let feets: any[] = this.pointForm.value.point.pointEntry.feets;
    if (feets.length) {
      feets = feets.filter(feet => !feet.isDeleted);
      feets.forEach(feet => feet['feetDiff'] = feet.totalFeet)
    }
    const pointEntryObj = {
      rig: this.pointForm.value.info.rig,
      date: this.pointForm.value.info.date,
      boreType: this.pointForm.value.info.boreType,
      partyName: this.pointForm.value.info.partyName,
      partyState: this.pointForm.value.info.partyState,
      partyCity: this.pointForm.value.info.partyCity,
      partyMobile: this.pointForm.value.info.partyMobile,
      partyArea: this.pointForm.value.info.partyArea,
      casingType: this.pointForm.value.info.casingType,
      pipeType: this.pointForm.value.info.pipeType,
      pipeSelection: this.pointForm.value.info.pipeSelection,
      agentType: this.pointForm.value.point.agentType,
      agentName: this.pointForm.value.point.agentName,
      totalFeet: this.pointForm.value.point.pointEntry.totalFeet,
      feets,
      totalFeetAmt: this.pointForm.value.point.pointEntry.totalFeetAmt,
      pvc7Depth: this.pointForm.value.point.pointEntry.Pvc7Depth,
      pvc7DepthRate: this.pointForm.value.point.pointEntry.Pvc7DepthRate,
      pvc7Amt: this.pointForm.value.point.pointEntry.Pvc7Amt,
      pvc10Depth: this.pointForm.value.point.pointEntry.Pvc10Depth,
      pvc10DepthRate: this.pointForm.value.point.pointEntry.Pvc10DepthRate,
      pvc10Amt: this.pointForm.value.point.pointEntry.Pvc10Amt,
      pvc12Depth: this.pointForm.value.point.pointEntry.Pvc12Depth,
      pvc12DepthRate: this.pointForm.value.point.pointEntry.Pvc12DepthRate,
      pvc12Amt: this.pointForm.value.point.pointEntry.Pvc12Amt,
      msMediumDepth: this.pointForm.value.point.pointEntry.MsMediumDepth,
      msMediumDepthRate: this.pointForm.value.point.pointEntry.MsMediumDepthRate,
      msMediumAmt: this.pointForm.value.point.pointEntry.MsMediumAmt,
      msHeavyDepth: this.pointForm.value.point.pointEntry.MsHeavyDepth,
      msHeavyDepthRate: this.pointForm.value.point.pointEntry.MsHeavyDepthRate,
      msHeavyAmt: this.pointForm.value.point.pointEntry.MsHeavyAmt,
      totalCasingAmt: this.pointForm.value.point.pointEntry.totalCasingAmt,
      welding: this.pointForm.value.point.pointEntry.welding,
      amtPerWelding: this.pointForm.value.point.pointEntry.amtPerWelding,
      weldingAmt: this.pointForm.value.point.pointEntry.weldingAmt,
      allowance: this.pointForm.value.point.pointEntry.allowance,
      startRpm: this.pointForm.value.point.bitDetails.startRpm,
      endRpm: this.pointForm.value.point.bitDetails.endRpm,
      totalRpm: this.pointForm.value.point.bitDetails.totalRpm,
      totalFeetPerHour: this.pointForm.value.point.bitDetails.totalFeetPerHour,
      overallTotalAmt: this.pointForm.value.otherDetails.overallTotalAmt,
      totalAmt: this.pointForm.value.otherDetails.totalAmt,
      commissionAmt: this.pointForm.value.otherDetails.commissionAmt,
      remarks: this.pointForm.value.otherDetails.remarks,
      pointno: this.pointForm.value.info.pointNumber,
      agentOfficeName: selectedAgent.officeName,
      agentAddress: selectedAgent.address,
      agentMobileNo: selectedAgent.mobileNumber,
      agentState: selectedAgent.state
    }
    console.log(JSON.stringify({
      ...pointEntryObj,
      date: pointEntryObj.date ? (pointEntryObj.date as Moment).format('DD-MM-YYYY') : null
    }, null, 2));

    this.http.post(this.pointUrl, {
      ...pointEntryObj,
      date: pointEntryObj.date ? (pointEntryObj.date as Moment).format('DD-MM-YYYY') : null
    }
    ).subscribe((response) => {
      this.toastr.success('Point Added Sucessfully', null, { timeOut: 1500 })
      // this.stepper.reset();
      // this.resetForm();
      this.common.scrollTop();
      const date = this.pointForm.value.info.date;
      const formattedDate = date ? (date as Moment).format('DD-MM-YYYY') : null
      this.router.navigate(['../../reports/pointDetails/pointReport', this.pointForm.value.info.pointNumber], { relativeTo: this.route, queryParams: { view: 'report' } })
    }, (err) => {
      if (err) {
        this.toastr.error('Error while saving Point', null, { timeOut: 1500 })
      }
    })
  }


}

