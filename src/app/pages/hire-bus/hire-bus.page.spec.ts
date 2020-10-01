import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HireBusPage } from './hire-bus.page';

describe('HireBusPage', () => {
  let component: HireBusPage;
  let fixture: ComponentFixture<HireBusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireBusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HireBusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
