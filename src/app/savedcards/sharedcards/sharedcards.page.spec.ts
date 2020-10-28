import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedcardsPage } from './sharedcards.page';

describe('SharedcardsPage', () => {
  let component: SharedcardsPage;
  let fixture: ComponentFixture<SharedcardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedcardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedcardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
