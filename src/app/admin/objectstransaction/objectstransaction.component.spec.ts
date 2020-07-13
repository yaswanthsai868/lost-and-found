import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectstransactionComponent } from './objectstransaction.component';

describe('ObjectstransactionComponent', () => {
  let component: ObjectstransactionComponent;
  let fixture: ComponentFixture<ObjectstransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectstransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectstransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
