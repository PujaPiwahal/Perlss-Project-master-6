import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeReviewFormComponent } from './committee-review-form.component';

describe('CommitteeReviewFormComponent', () => {
  let component: CommitteeReviewFormComponent;
  let fixture: ComponentFixture<CommitteeReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
