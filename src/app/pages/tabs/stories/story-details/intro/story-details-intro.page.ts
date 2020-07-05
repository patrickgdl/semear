import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './story-details-intro.page.html',
  styleUrls: ['./story-details-intro.page.scss']
})
export class StoryDetailsIntroPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  intro: string;

  ngOnInit() {
    this.intro = this.router.getCurrentNavigation().extras.state.intro;
    console.log(this.intro);
  }

}
