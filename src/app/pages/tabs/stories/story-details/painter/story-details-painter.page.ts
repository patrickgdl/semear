import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-details-painter',
  templateUrl: './story-details-painter.page.html',
  styleUrls: ['./story-details-painter.page.scss']
})
export class StoryDetailsPainterPage {
  clipBounds = { x: 100, y: 100, width: 200, height: 200 };

  onPaintStart(): void {
    console.log('paint started');
  }

  onPaintEnd(): void {
    console.log('paint ended');
  }

  onUndoLengthChanged(e): void {
    console.log(e);
  }

  onRedoLengthChanged(e): void {
    console.log(e);
  }

  onIsEmptyChanged(e): void {
    console.log(e);
  }
}
