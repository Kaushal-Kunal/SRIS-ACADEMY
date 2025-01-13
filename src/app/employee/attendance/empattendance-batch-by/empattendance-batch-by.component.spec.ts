import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpattendanceBatchByComponent } from './empattendance-batch-by.component';

describe('EmpattendanceBatchByComponent', () => {
  let component: EmpattendanceBatchByComponent;
  let fixture: ComponentFixture<EmpattendanceBatchByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpattendanceBatchByComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpattendanceBatchByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
