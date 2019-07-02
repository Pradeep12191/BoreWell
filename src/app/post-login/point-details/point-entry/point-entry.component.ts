import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-point-entry',
  templateUrl: './point-entry.component.html',
  styleUrls: ['./point-entry.component.scss']
})
export class PointEntryComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  basicInfoForm: FormGroup;
  rigs;
  boreTypes;
  partyStates;
  partyCities;
  casingTypes;
  pipes;
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
      agentType: ['self', Validators.required]
    })

  }

}
