import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanatipoComponent } from './ventanatipo.component';

describe('VentanatipoComponent', () => {
  let component: VentanatipoComponent;
  let fixture: ComponentFixture<VentanatipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanatipoComponent]
    });
    fixture = TestBed.createComponent(VentanatipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
