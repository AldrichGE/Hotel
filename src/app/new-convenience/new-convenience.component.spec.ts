import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConvenienceComponent } from './new-convenience.component';

describe('NewConvenienceComponent', () => {
  let component: NewConvenienceComponent;
  let fixture: ComponentFixture<NewConvenienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewConvenienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConvenienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
