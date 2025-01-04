import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceBatchByComponent } from './attendance-batch-by.component';

describe('AttendanceBatchByComponent', () => {
  let component: AttendanceBatchByComponent;
  let fixture: ComponentFixture<AttendanceBatchByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceBatchByComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceBatchByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
