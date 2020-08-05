import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DbService } from '../../../../services/firebase/db.service';
import { Story } from './../../../../models/story.interface';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-story-details',
  templateUrl: 'story-details.page.html',
  styleUrls: ['story-details.page.scss']
})
export class StoryDetailsPage implements OnInit {
  story$: Observable<Story>;
  segment: string;
  imageUrlStyle = `linear-gradient(162deg, rgba(56, 70, 108, .8) 20%, rgba(56, 70, 108, .8) 100%), url('$url') top no-repeat`;

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.present('Carregando história...');

    const id = this.route.snapshot.paramMap.get('id');

    this.story$ = this.dbService.doc$<Story>(`stories/${id}`).pipe(
      tap((data) => {
        this.imageUrlStyle = this.imageUrlStyle.replace('$url', data.coverURL);
        this.segmentChanged(this.router.url.split('/')[3]);
        this.loadingService.dismiss();
      })
    );
  }

  segmentChanged(segment = 'intro') {
    this.segment = segment;
    const id = this.route.snapshot.paramMap.get('id');
    if (segment === 'intro') {
      this.router.navigate([`/stories/${id}/intro`]);
    }
    if (segment === 'games') {
      this.router.navigate([`/stories/${id}/games`]);
    }
    if (segment === 'discussion') {
      this.router.navigate([`/stories/${id}/discussion`]);
    }
  }
}
