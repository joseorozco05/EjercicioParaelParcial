import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiqueteAddComponent } from './tiquete-add.component';

describe('TiqueteAddComponent', () => {
  let component: TiqueteAddComponent;
  let fixture: ComponentFixture<TiqueteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiqueteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiqueteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
