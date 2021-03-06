import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DesigncardPage } from './designcard.page';

describe('DesigncardPage', () => {
  let component: DesigncardPage;
  let fixture: ComponentFixture<DesigncardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesigncardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesigncardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
