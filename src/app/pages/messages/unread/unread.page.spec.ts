import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnreadPage } from './unread.page';

describe('UnreadPage', () => {
  let component: UnreadPage;
  let fixture: ComponentFixture<UnreadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnreadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
