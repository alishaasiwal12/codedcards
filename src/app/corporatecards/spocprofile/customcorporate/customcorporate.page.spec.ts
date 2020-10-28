import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomcorporatePage } from './customcorporate.page';

describe('CustomcorporatePage', () => {
  let component: CustomcorporatePage;
  let fixture: ComponentFixture<CustomcorporatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomcorporatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomcorporatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
