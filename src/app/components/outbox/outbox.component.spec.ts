import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutboxComponent } from './outbox.component';

describe('OutboxComponent', () => {
  let component: OutboxComponent;
  let fixture: ComponentFixture<OutboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboxComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
