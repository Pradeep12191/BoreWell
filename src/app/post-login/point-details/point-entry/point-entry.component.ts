import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PointEntryService } from './point-entry.serice';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/config.service';

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

  constructor(
    private fb: FormBuilder,
    private pes: PointEntryService,
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.appearance = this.config.getConfig('formAppearance');
  }

  ngOnInit() {

    this.pointForm = this.fb.group({
      info: this.fb.group({
        rig: [null, Validators.required],
        date: [null, Validators.required],
        boreType: [null, Validators.required],
        partyName: [null, Validators.required],
        partyState: [null, Validators.required],
        partyCity: [null, Validators.required],
        partyMobile: [null, Validators.required],
        casingType: [null, Validators.required],
        pipeSelection: [null, Validators.required],
      }),
      point: this.fb.group({
        agentType: ['self', Validators.required],
        pointEntry: this.fb.group({
          totalFeet: [null, Validators.required],
          feets: this.fb.array([this.pes.feetFormBuilder()]),
          totalFeetAmt: [null, Validators.required],
          casingDepth: [null, Validators.required],
          casingDepthRate: [null, Validators.required],
          casingFeetAmt: null
        }),
        otherCharges: this.fb.group({
          charges: this.fb.array([this.pes.chargeFormBuilder()])
        }),
        bitDetails: this.fb.group({
          startRpm: null,
          endRpm: null,
          totalRpm: null,
          bits: this.fb.array([this.pes.bitFormBuilder()])
        }),
        hammerDetails: this.fb.group({
          hammers: this.fb.array([this.pes.hammerFormBuilder()])
        }),
      }),
      otherDetails: this.fb.group({
        overallTotalAmt: [null, Validators.required],
        totalAmt: [null, Validators.required],
        commissionAmt: [null, Validators.required],
        remarks: [null]
      })
    })

  }

  saveClick() {
    console.log(JSON.stringify(this.pointForm.value, null, 2));
    this.http.post('http://103.207.4.72:8080/borewell/webapi/resource/createpoint', this.pointForm.value).subscribe((response) => {
      console.log(response);
    })
  }


}

