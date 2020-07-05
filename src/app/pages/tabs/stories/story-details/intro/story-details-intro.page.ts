import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Story } from './../../../../../models/story.interface';
import { DbService } from './../../../../../services/db.service';

@Component({
  selector: 'app-story-details-intro',
  templateUrl: './story-details-intro.page.html',
  styleUrls: ['./story-details-intro.page.scss']
})
export class StoryDetailsIntroPage implements OnInit {

  story: Story;

  constructor(
    private router: Router,
    private dbService: DbService
  ) { }

  ngOnInit() {
    const id = this.router.url.split('/')[2];
    this.dbService.doc$(`stories/${id}`)
      .subscribe(
        (data: Story) => {
          data.content = data.content.split('\\n').join('\n');
          this.story = data;
        }
      );
  }

}
