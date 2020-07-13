import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindlostitemComponent } from './findlostitem.component';

describe('FindlostitemComponent', () => {
  let component: FindlostitemComponent;
  let fixture: ComponentFixture<FindlostitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindlostitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindlostitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
