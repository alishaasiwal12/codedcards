import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { RateappPage } from './rateapp.page';

describe('RateappPage', () => {
  let component: RateappPage;
  let fixture: ComponentFixture<RateappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
