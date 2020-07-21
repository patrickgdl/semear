import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-canvas-painter',
  templateUrl: './canvas-painter.page.html',
  styles: []
})
export class CanvasPainterPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  canvasElement: any;

  saveX: number;
  saveY: number;

  // Color Stuff
  selectedColor = '#9e2956';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];

  constructor(private file: File, private storage: Storage, public renderer: Renderer2, private plt: Platform) {}

  ngOnInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }

  startDrawing(ev) {
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }
}
