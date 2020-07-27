import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Story } from './../../../models/story.interface';
import { DbService } from './../../../services/db.service';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
})
export class StoriesPage {
  stories$: Observable<Story[]>;
  slideConfig = {
    centeredSlides: true,
    slidesPerView: 'auto'
  };

  constructor(private dbService: DbService, private router: Router) {
  }

  ionViewDidEnter() {
    this.stories$ = this.dbService.collection$('stories').pipe(
      map((res) => {
        res.forEach((element) => {
          element.content = element.content.split('\\n').join('\n');
          return element;
        });
        return res;
      })
    );
  }

  goToDetail(uid: string) {
    this.router.navigate([`stories/${uid}`]);
  }
}
