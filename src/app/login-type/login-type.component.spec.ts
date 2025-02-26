import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTypeComponent } from './login-type.component';

describe('LoginTypeComponent', () => {
  let component: LoginTypeComponent;
  let fixture: ComponentFixture<LoginTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
