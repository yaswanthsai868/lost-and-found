import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveadminComponent } from './removeadmin.component';

describe('RemoveadminComponent', () => {
  let component: RemoveadminComponent;
  let fixture: ComponentFixture<RemoveadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
