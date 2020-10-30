import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaeActivityDailyLivingPartTwoComponent } from './pae-activity-daily-living-part-two.component';

describe('PaeActivityDailyLivingPartTwoComponent', () => {
  let component: PaeActivityDailyLivingPartTwoComponent;
  let fixture: ComponentFixture<PaeActivityDailyLivingPartTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaeActivityDailyLivingPartTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaeActivityDailyLivingPartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
