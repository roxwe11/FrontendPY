import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaconfigComponent } from './vistaconfig.component';

describe('VistaconfigComponent', () => {
  let component: VistaconfigComponent;
  let fixture: ComponentFixture<VistaconfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaconfigComponent]
    });
    fixture = TestBed.createComponent(VistaconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
