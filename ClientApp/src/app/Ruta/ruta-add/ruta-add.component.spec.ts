import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAddComponent } from './ruta-add.component';

describe('RutaAddComponent', () => {
  let component: RutaAddComponent;
  let fixture: ComponentFixture<RutaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
