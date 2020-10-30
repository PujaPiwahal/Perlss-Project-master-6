import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaeActivitiesPart2Component} from './pae-activities-part2.component';

describe('PaeActivitiesPart2Component', () => {
  let component: PaeActivitiesPart2Component;
  let fixture: ComponentFixture<PaeActivitiesPart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaeActivitiesPart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaeActivitiesPart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
