import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotManagementComponent } from './slot-management.component';

describe('SlotManagementComponent', () => {
  let component: SlotManagementComponent;
  let fixture: ComponentFixture<SlotManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
