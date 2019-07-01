import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEntryComponent } from './point-entry.component';

describe('PointEntryComponent', () => {
  let component: PointEntryComponent;
  let fixture: ComponentFixture<PointEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
