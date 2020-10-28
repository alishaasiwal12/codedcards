import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ShowinstructionsPage } from './showinstructions.page';

describe('ShowinstructionsPage', () => {
  let component: ShowinstructionsPage;
  let fixture: ComponentFixture<ShowinstructionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowinstructionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowinstructionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
