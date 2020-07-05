import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-canvas-drawings',
  templateUrl: 'story-canvas-drawings.page.html',
  styleUrls: ['./story-canvas-drawings.page.scss']
})
export class StoryCanvasDrawingsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
