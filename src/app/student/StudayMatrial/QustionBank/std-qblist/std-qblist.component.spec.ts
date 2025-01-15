import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdQBListComponent } from './std-qblist.component';

describe('StdQBListComponent', () => {
  let component: StdQBListComponent;
  let fixture: ComponentFixture<StdQBListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdQBListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdQBListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
