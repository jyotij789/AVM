import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCriteriaComponent } from './component-criteria.component';

describe('ComponentCriteriaComponent', () => {
  let component: ComponentCriteriaComponent;
  let fixture: ComponentFixture<ComponentCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
