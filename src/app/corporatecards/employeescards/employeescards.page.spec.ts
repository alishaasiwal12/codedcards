import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmployeescardsPage } from './employeescards.page';

describe('EmployeescardsPage', () => {
  let component: EmployeescardsPage;
  let fixture: ComponentFixture<EmployeescardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeescardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeescardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
