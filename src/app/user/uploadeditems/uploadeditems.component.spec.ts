import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadeditemsComponent } from './uploadeditems.component';

describe('UploadeditemsComponent', () => {
  let component: UploadeditemsComponent;
  let fixture: ComponentFixture<UploadeditemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadeditemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadeditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
