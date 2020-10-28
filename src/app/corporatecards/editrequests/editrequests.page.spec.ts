import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditrequestsPage } from './editrequests.page';

describe('EditrequestsPage', () => {
  let component: EditrequestsPage;
  let fixture: ComponentFixture<EditrequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditrequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
