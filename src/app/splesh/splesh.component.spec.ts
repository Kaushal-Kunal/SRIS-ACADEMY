import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpleshComponent } from './splesh.component';

describe('SpleshComponent', () => {
  let component: SpleshComponent;
  let fixture: ComponentFixture<SpleshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpleshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpleshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
