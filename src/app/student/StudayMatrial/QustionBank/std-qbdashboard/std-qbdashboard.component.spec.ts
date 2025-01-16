import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdQBDashboardComponent } from './std-qbdashboard.component';

describe('StdQBDashboardComponent', () => {
  let component: StdQBDashboardComponent;
  let fixture: ComponentFixture<StdQBDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdQBDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdQBDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
