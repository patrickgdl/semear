import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Story } from './../../../../../models/story.interface';
import { DbService } from '../../../../../services/firebase/db.service';

@Component({
  selector: 'app-story-details-intro',
  templateUrl: './story-details-intro.page.html',
  styleUrls: ['./story-details-intro.page.scss']
})
export class StoryDetailsIntroPage implements OnInit {
  story$: Observable<Story>;
  lists = [
    {
      text: 'Escrever',
      label: 'Continue a história do seu jeito',
      image: 'assets/icon/writer.svg',
      url: '/writer'
    },
    {
      text: 'Fanfic',
      label: 'Crie sua história do zero',
      image: 'assets/icon/fanfic.svg',
      url: '/fanfic'
    },
    {
      text: 'Ilustrar',
      label: 'Ilustre a história com o seu desenho',
      image: 'assets/icon/ilustrater.svg',
      url: '/illustrator'
    },
    {
      text: 'Gravar',
      label: 'A história com sua voz',
      image: 'assets/icon/recorder.svg',
      url: '/recorder'
    },
    {
      text: 'Colorir',
      label: 'Pinte a história com suas cores preferidas',
      image: 'assets/icon/painter.svg',
      url: '/painter'
    }
  ];

  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {
    const uid = this.router.url.split('/')[2];
    this.story$ = this.dbService.doc$(`stories/${uid}`).pipe(
      map((data) => {
        data.content = data.content.split('\\n').join('\n');
        return data;
      })
    );
  }

  navigateToInit(uid: string) {
    this.router.navigate([`story-canvas/${uid}/drawing`]);
  }

  navigateToChildren(uid: string, url: string) {
    this.router.navigate([`stories/${uid}/${url}`]);
  }
}
