import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-canvas-painter',
  templateUrl: './canvas-painter.page.html',
  styles: []
})
export class CanvasPainterPage implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  canvasElement: any;
  saveX: number;
  saveY: number;

  selectedColor = '#9e2956';
  colors = ['#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3'];

  drawing = false;
  lineWidth = 5;

  constructor(private plt: Platform, private toastCtrl: ToastController) {}

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }

  startDrawing(ev) {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  setBackground() {
    const background = new Image();
    background.src = './assets/img/forest.jpg';
    const ctx = this.canvasElement.getContext('2d');

    background.onload = () => {
      ctx.drawImage(background, 0, 0, this.canvasElement.width, this.canvasElement.height);
    };
  }

  moved(ev) {
    if (!this.drawing) {
      return;
    }

    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const ctx = this.canvasElement.getContext('2d');

    const currentX = ev.pageX - canvasPosition.x;
    const currentY = ev.pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  exportCanvasImage() {
    const dataUrl = this.canvasElement.toDataURL();

    // Clear the current canvas
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Fallback for Desktop
    const data = dataUrl.split(',')[1];
    const blob = this.b64toBlob(data, 'image/png');

    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'canvasimage.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
