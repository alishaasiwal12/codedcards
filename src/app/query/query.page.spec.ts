import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { QueryPage } from './query.page';

describe('QueryPage', () => {
  let component: QueryPage;
  let fixture: ComponentFixture<QueryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
