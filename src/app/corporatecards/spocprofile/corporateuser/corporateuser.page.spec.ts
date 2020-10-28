import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CorporateuserPage } from './corporateuser.page';

describe('CorporateuserPage', () => {
  let component: CorporateuserPage;
  let fixture: ComponentFixture<CorporateuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
