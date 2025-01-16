import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdNoteslistComponent } from './std-noteslist.component';

describe('StdNoteslistComponent', () => {
  let component: StdNoteslistComponent;
  let fixture: ComponentFixture<StdNoteslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdNoteslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdNoteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
