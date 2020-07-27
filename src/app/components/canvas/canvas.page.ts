import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  template: `<canvas #canvas></canvas>'`,
  styles: ['canvas { border: 1px solid #000; background: #fff}']
})
export class CanvasPage implements AfterViewInit {
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  @Input() width: number;
  @Input() height = 400;

  private ctx: CanvasRenderingContext2D | null;

  constructor(private platform: Platform) {}

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    canvasEl.width = this.platform.width();
    canvasEl.height = this.height;

    if (this.ctx) {
      this.ctx.lineWidth = 3;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = '#000';
    }

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'mousemove').pipe(
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            pairwise() /* Return the previous and last values as array */
          );
        })
      )
      .subscribe((res: any) => {
        const prevPos = this.getMousePosition(canvasEl, res[0]);
        const currentPos = this.getMousePosition(canvasEl, res[1]);
        this.drawOnCanvas(prevPos, currentPos);
      });

    fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'touchmove').pipe(takeUntil(fromEvent(canvasEl, 'touchend')), pairwise());
        })
      )
      .subscribe((res: any) => {
        const prevPos = this.getTouchPosition(canvasEl, res[0]);
        const currentPos = this.getTouchPosition(canvasEl, res[1]);
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number; y: number }, currentPos: { x: number; y: number }) {
    if (!this.ctx) {
      return;
    }

    this.ctx.beginPath();

    if (prevPos) {
      this.ctx.moveTo(prevPos.x, prevPos.y); // from
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.stroke();
    }
  }

  // Get the position of a touch relative to the canvas
  private getTouchPosition(canvasEl: HTMLCanvasElement, touchEvent: TouchEvent) {
    const rect = canvasEl.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  // Get the position of a mouse relative to the canvas
  private getMousePosition(canvasEl: HTMLCanvasElement, touchEvent: MouseEvent) {
    const rect = canvasEl.getBoundingClientRect();
    return {
      x: touchEvent.clientX - rect.left,
      y: touchEvent.clientY - rect.top
    };
  }
}
