import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { EditCorporatePage } from './edit-corporate.page';

describe('EditCorporatePage', () => {
  let component: EditCorporatePage;
  let fixture: ComponentFixture<EditCorporatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCorporatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCorporatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
