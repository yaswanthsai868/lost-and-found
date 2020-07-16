import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedItemdetailsComponent } from './uploaded-itemdetails.component';

describe('UploadedItemdetailsComponent', () => {
  let component: UploadedItemdetailsComponent;
  let fixture: ComponentFixture<UploadedItemdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedItemdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedItemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
