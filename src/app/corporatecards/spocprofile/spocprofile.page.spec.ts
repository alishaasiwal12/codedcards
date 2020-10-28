import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpocprofilePage } from './spocprofile.page';

describe('SpocprofilePage', () => {
  let component: SpocprofilePage;
  let fixture: ComponentFixture<SpocprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpocprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpocprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
