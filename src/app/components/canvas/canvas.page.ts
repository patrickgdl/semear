import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  template: `<canvas #canvas></canvas>'`,
  styles: ['canvas { border: 1px solid #000; background: #fff}']
})
export class CanvasPage implements AfterViewInit {
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  @Input() public width = 345;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

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
      .subscribe((res: [MouseEvent, MouseEvent]) => {
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
      .subscribe((res: [TouchEvent, TouchEvent]) => {
        const prevPos = this.getTouchPosition(canvasEl, res[0]);
        const currentPos = this.getTouchPosition(canvasEl, res[1]);
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number; y: number }, currentPos: { x: number; y: number }) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
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
