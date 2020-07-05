import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Story } from './../../../../models/story.interface';
import { DbService } from './../../../../services/db.service';

@Component({
  selector: 'app-story-details',
  templateUrl: 'story-details.page.html',
  styleUrls: ['story-details.page.scss']
})
export class StoryDetailsPage implements OnInit {

  story: Story;

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dbService.doc$(`stories/${id}`)
      .subscribe(
        (data: Story) => {
          data.summary = data.summary.split('\\n').join('\n');
          this.story = data;
        },
        error => {
        }
      );
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
