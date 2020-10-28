import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { CustomertypePage } from './customertype.page';

describe('CustomertypePage', () => {
  let component: CustomertypePage;
  let fixture: ComponentFixture<CustomertypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
