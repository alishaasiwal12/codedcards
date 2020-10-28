import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SavedcardsPage } from './savedcards.page';

describe('SavedcardsPage', () => {
  let component: SavedcardsPage;
  let fixture: ComponentFixture<SavedcardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedcardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();


  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SavedcardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
