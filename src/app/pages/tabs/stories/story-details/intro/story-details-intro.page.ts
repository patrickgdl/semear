import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Story } from './../../../../../models/story.interface';
import { DbService } from './../../../../../services/db.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story-details-intro',
  templateUrl: './story-details-intro.page.html',
  styleUrls: ['./story-details-intro.page.scss']
})
export class StoryDetailsIntroPage implements OnInit {
  story$: Observable<Story>;

  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {
    const id = this.router.url.split('/')[2];
    this.story$ = this.dbService.doc$(`stories/${id}`).pipe(
      map((data) => {
        data.content = data.content.split('\\n').join('\n');
        return data;
      })
    );
  }

  navigateTo(uid: string) {
    this.router.navigate([`story-canvas/${uid}/drawing`]);
  }
}
