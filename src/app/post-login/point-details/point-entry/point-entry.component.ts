import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PointEntryService } from './point-entry.serice';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/config.service';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import { MatStepper } from '@angular/material';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-point-entry',
  templateUrl: './point-entry.component.html',
  styleUrls: ['./point-entry.component.scss']
})
export class PointEntryComponent implements OnInit {

  pointForm: FormGroup;
  rigs;
  boreTypes;
  partyStates;
  partyCities;
  casingTypes;
  pipes;
  appearance: string;
  pointUrl;
  @ViewChild(MatStepper, { static: false }) stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private pes: PointEntryService,
    private http: HttpClient,
    private config: ConfigService,
    private toastr: ToastrService,
    private common: CommonService
  ) {
    this.appearance = this.config.getConfig('formAppearance');
    const baseUrl = this.config.getConfig('apiUrl');
    const url = this.config.getUrl('createpoint')
    this.pointUrl = baseUrl + url;
  }

  ngOnInit() {

    this.pointForm = this.fb.group({
      info: this.fb.group({
        rig: '',
        date: '',
        boreType: '',
        partyName: '',
        partyState: '',
        partyCity: '',
        partyMobile: '',
        casingType: '',
        pipeSelection: '',
      }),
      point: this.fb.group({
        agentType: 'self',
        pointEntry: this.fb.group({
          totalFeet: '',
          feets: this.fb.array([this.pes.feetFormBuilder()]),
          totalFeetAmt: '',
          casingDepth: '',
          casingDepthRate: '',
          casingFeetAmt: ''
        }),
        otherCharges: this.fb.group({
          charges: this.fb.array([this.pes.chargeFormBuilder()])
        }),
        bitDetails: this.fb.group({
          startRpm: '0',
          endRpm: '',
          totalRpm: '',
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

  resetForm() {
    this.pointForm.reset({
      point: {
        pointEntry: {
          feets: [{ startFeet: '0' }],
          bitDetails: {
            startRpm: '0'
          }
        }
      }
    });
  }


  save() {
    console.log(this.pointForm)
    if (this.pointForm.invalid) {
      return this.toastr.error('Please fill all required fields *', null, { timeOut: 1500 })
    }
    const formValue = this.pointForm.value;
    const pointEntryObj = {
      rig: this.pointForm.value.info.rig,
      date: this.pointForm.value.info.date,
      boreType: this.pointForm.value.info.boreType,
      partyName: this.pointForm.value.info.partyName,
      partyState: this.pointForm.value.info.partyState,
      partyCity: this.pointForm.value.info.partyCity,
      partyMobile: this.pointForm.value.info.partyMobile,
      casingType: this.pointForm.value.info.casingType,
      pipeSelection: this.pointForm.value.info.pipeSelection,
      agentType: this.pointForm.value.point.agentType,
      totalFeet: this.pointForm.value.point.pointEntry.totalFeet,
      feets: this.pointForm.value.point.pointEntry.feets,
      totalFeetAmt: this.pointForm.value.point.pointEntry.totalFeetAmt,
      casingDepth: this.pointForm.value.point.pointEntry.casingDepth,
      casingDepthRate: this.pointForm.value.point.pointEntry.casingDepthRate,
      casingFeetAmt: this.pointForm.value.point.pointEntry.casingFeetAmt,
      startRpm: this.pointForm.value.point.bitDetails.startRpm,
      endRpm: this.pointForm.value.point.bitDetails.endRpm,
      totalRpm: this.pointForm.value.point.bitDetails.totalRpm,
      overallTotalAmt: this.pointForm.value.otherDetails.overallTotalAmt,
      totalAmt: this.pointForm.value.otherDetails.totalAmt,
      commissionAmt: this.pointForm.value.otherDetails.commissionAmt,
      remarks: this.pointForm.value.otherDetails.remarks
    }
    console.log(JSON.stringify({
      ...pointEntryObj,
      date: pointEntryObj.date ? (pointEntryObj.date as Moment).format('DD-MM-YYYY') : null
    }, null, 2));

    this.http.post(this.pointUrl, {
      ...pointEntryObj,
      date: pointEntryObj.date ? (pointEntryObj.date as Moment).format('DD/MM/YYYY') : null
    }
    ).subscribe((response) => {
      this.toastr.success('Point Added Sucessfully', null, { timeOut: 1500 })
      this.stepper.reset();
      this.resetForm();
      this.common.scrollTop();
    }, (err) => {
      if (err) {
        this.toastr.error('Error while saving Point', null, { timeOut: 1500 })
      }
    })
  }


}

