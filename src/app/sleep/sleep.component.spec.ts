import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepComponent } from './sleep.component';

describe('SleepComponent', () => {
  let component: SleepComponent;
  let fixture: ComponentFixture<SleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SleepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
