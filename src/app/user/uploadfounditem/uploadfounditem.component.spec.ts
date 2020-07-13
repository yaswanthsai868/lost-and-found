import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfounditemComponent } from './uploadfounditem.component';

describe('UploadfounditemComponent', () => {
  let component: UploadfounditemComponent;
  let fixture: ComponentFixture<UploadfounditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadfounditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfounditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
