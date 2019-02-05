import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnBlogsComponent } from './own-blogs.component';

describe('OwnBlogsComponent', () => {
  let component: OwnBlogsComponent;
  let fixture: ComponentFixture<OwnBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
