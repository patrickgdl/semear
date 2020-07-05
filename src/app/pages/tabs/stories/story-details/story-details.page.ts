import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Story } from './../../../../models/story.interface';
import { DbService } from './../../../../services/db.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-story-details',
  templateUrl: 'story-details.page.html',
  styleUrls: ['story-details.page.scss']
})
export class StoryDetailsPage implements OnInit {

  story: Story;

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.loadingService.present('Carregando história...');
    const id = this.route.snapshot.paramMap.get('id');
    this.dbService.doc$(`stories/${id}`)
      .subscribe(
        (data: Story) => {
          data.summary = data.summary.split('\\n').join('\n');
          this.story = data;
          this.loadingService.dismiss();
          this.segmentChanged();
        },
        error => {
          this.loadingService.dismiss();
        }
      );
  }

  segmentChanged(tab = 'intro') {
    const id = this.route.snapshot.paramMap.get('id');
    if (tab === 'intro') {
      this.router.navigate([`/stories/${id}/intro`], { state: { intro: this.story.summary } });
    }
    if (tab === 'games') {
      this.router.navigate([`/stories/${id}/games`]);
    }
    if (tab === 'discussion') {
      this.router.navigate([`/stories/${id}/discussion`]);
    }
  }

}
