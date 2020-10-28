import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { EditCorporateuserPage } from './edit-corporateuser.page';

describe('EditCorporateuserPage', () => {
  let component: EditCorporateuserPage;
  let fixture: ComponentFixture<EditCorporateuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorporateuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorporateuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
