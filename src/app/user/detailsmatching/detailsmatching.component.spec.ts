import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmatchingComponent } from './detailsmatching.component';

describe('DetailsmatchingComponent', () => {
  let component: DetailsmatchingComponent;
  let fixture: ComponentFixture<DetailsmatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsmatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
