import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebSpeechPage } from './web-speech.page';

describe('WebSpeechPage', () => {
  let component: WebSpeechPage;
  let fixture: ComponentFixture<WebSpeechPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSpeechPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebSpeechPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
