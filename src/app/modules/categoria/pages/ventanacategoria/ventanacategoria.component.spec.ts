import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanacategoriaComponent } from './ventanacategoria.component';

describe('VentanacategoriaComponent', () => {
  let component: VentanacategoriaComponent;
  let fixture: ComponentFixture<VentanacategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanacategoriaComponent]
    });
    fixture = TestBed.createComponent(VentanacategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
