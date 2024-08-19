import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDataComponent } from './reserve-data.component';

describe('ReserveDataComponent', () => {
  let component: ReserveDataComponent;
  let fixture: ComponentFixture<ReserveDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
