import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdNotesDashboardComponent } from './std-notes-dashboard.component';

describe('StdNotesDashboardComponent', () => {
  let component: StdNotesDashboardComponent;
  let fixture: ComponentFixture<StdNotesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdNotesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdNotesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
