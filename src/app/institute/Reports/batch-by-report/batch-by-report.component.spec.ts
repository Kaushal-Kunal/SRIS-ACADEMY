import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchByReportComponent } from './batch-by-report.component';

describe('BatchByReportComponent', () => {
  let component: BatchByReportComponent;
  let fixture: ComponentFixture<BatchByReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchByReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchByReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
