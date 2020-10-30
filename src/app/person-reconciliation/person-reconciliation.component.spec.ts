import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonReconciliationComponent } from './person-reconciliation.component';

describe('PersonReconciliationComponent', () => {
  let component: PersonReconciliationComponent;
  let fixture: ComponentFixture<PersonReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
