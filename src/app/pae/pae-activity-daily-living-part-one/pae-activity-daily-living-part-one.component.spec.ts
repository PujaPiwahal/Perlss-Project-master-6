import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaeActivityDailyLivingPartOneComponent } from './pae-activity-daily-living-part-one.component';

describe('PaeActivityDailyLivingPartOneComponent', () => {
  let component: PaeActivityDailyLivingPartOneComponent;
  let fixture: ComponentFixture<PaeActivityDailyLivingPartOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaeActivityDailyLivingPartOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaeActivityDailyLivingPartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
