import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnotpComponent } from './returnotp.component';

describe('ReturnotpComponent', () => {
  let component: ReturnotpComponent;
  let fixture: ComponentFixture<ReturnotpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnotpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
