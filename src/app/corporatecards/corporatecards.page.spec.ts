import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CorporatecardsPage } from './corporatecards.page';

describe('CorporatecardsPage', () => {
  let component: CorporatecardsPage;
  let fixture: ComponentFixture<CorporatecardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatecardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatecardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
