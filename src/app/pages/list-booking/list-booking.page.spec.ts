import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListBookingPage } from './list-booking.page';

describe('ListBookingPage', () => {
  let component: ListBookingPage;
  let fixture: ComponentFixture<ListBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
