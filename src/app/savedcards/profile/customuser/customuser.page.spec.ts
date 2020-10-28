import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CustomuserPage } from './customuser.page';

describe('CustomuserPage', () => {
  let component: CustomuserPage;
  let fixture: ComponentFixture<CustomuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
