import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Discussion } from './../../../../../models/discussion.interface';
import { DiscussionService } from './../../../../../services/discussion.service';
import { UtilsService } from './../../../../../services/utils.service';

@Component({
  selector: 'app-story-details-discussion',
  templateUrl: './story-details-discussion.page.html',
  styleUrls: ['./story-details-discussion.page.scss']
})
export class StoryDetailsDiscussionPage implements OnInit {

  discussions: Discussion[];

  constructor(
    private router: Router,
    private discussionService: DiscussionService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    const uid = this.router.url.split('/')[2];
    this.discussionService.get(uid)
      .subscribe(
        res => {
          this.discussions = res;
        }
      );
  }

}
