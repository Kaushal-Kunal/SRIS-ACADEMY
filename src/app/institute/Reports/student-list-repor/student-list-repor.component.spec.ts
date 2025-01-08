import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListReporComponent } from './student-list-repor.component';

describe('StudentListReporComponent', () => {
  let component: StudentListReporComponent;
  let fixture: ComponentFixture<StudentListReporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentListReporComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListReporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
