import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHospitalityComponent } from './new-hospitality.component';

describe('NewHospitalityComponent', () => {
  let component: NewHospitalityComponent;
  let fixture: ComponentFixture<NewHospitalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewHospitalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHospitalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
