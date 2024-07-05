import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionnComponent } from './ubicacionn.component';

describe('UbicacionnComponent', () => {
  let component: UbicacionnComponent;
  let fixture: ComponentFixture<UbicacionnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicacionnComponent]
    });
    fixture = TestBed.createComponent(UbicacionnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
