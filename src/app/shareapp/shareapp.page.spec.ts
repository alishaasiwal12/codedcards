import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareappPage } from './shareapp.page';

describe('ShareappPage', () => {
  let component: ShareappPage;
  let fixture: ComponentFixture<ShareappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
