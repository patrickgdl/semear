import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Story } from './../../../models/story.interface';
import { DbService } from '../../../services/firebase/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  stories$: Observable<Story[]>;
  slideConfig = {
    slidesPerView: 2.2
  };

  constructor(private dbService: DbService, private router: Router) {}

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
