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

  basicInfoForm: FormGroup;
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

    this.rigs = [
      { value: '1', display: 'KA01MP7396' },
      { value: '2', display: 'KA01MP7396' }
    ]
    this.boreTypes = [
      { value: '1', display: 'New Bore' },
      { value: '2', display: 'Re-Bore' },
      { value: '3', display: 'Flushing' },
    ];

    this.partyStates = [
      { value: '1', display: 'TamilNadu' },
      { value: '2', display: 'Karnataka' },
      { value: '3', display: 'Kerala' },
    ]

    this.partyCities = [
      { value: '1', display: 'Chennai' },
      { value: '2', display: 'Coimbatore' },
      { value: '3', display: 'Madurai' },
    ]

    this.casingTypes = [
      { value: '1', display: 'PVC' },
      { value: '2', display: 'MS (Mild Steel)' },
      { value: '3', display: 'Nill' },
    ]

    this.pipes = [
      { value: '1', display: 'Agent Pipe' },
      { value: '2', display: 'Party Pipe' },
      { value: '3', display: 'Company Pipe' },
      { value: '4', display: 'Nill' },

    ]

    this.basicInfoForm = this.fb.group({
      rig: [null, Validators.required],
      date: [null, Validators.required],
      boreType: [null, Validators.required],
      partyName: [null, Validators.required],
      partyState: [null, Validators.required],
      partyCity: [null, Validators.required],
      partyMobile: [null, Validators.required],
      casingType: [null, Validators.required],
      pipeSelection: [null, Validators.required],
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
      overallTotalAmt: [null, Validators.required],
      totalAmt: [null, Validators.required],
      commissionAmt: [null, Validators.required],
      remarks: [null]
    })

  }

  saveClick() {
    console.log(JSON.stringify(this.basicInfoForm.value, null, 2));
    this.http.post('http://103.207.4.72:8080/borewell/webapi/resource/createpoint', this.basicInfoForm.value).subscribe((response) => {
      console.log(response);
    })
  }


}

