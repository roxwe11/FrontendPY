import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaubicacionComponent } from './ventanaubicacion.component';

describe('VentanaubicacionComponent', () => {
  let component: VentanaubicacionComponent;
  let fixture: ComponentFixture<VentanaubicacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaubicacionComponent]
    });
    fixture = TestBed.createComponent(VentanaubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
