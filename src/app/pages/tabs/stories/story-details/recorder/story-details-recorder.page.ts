import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-story-details-recorder',
  templateUrl: './story-details-recorder.page.html',
  styleUrls: ['./story-details-recorder.page.scss']
})
export class StoryDetailsRecorderPage implements OnInit {
  @ViewChild('canvasElement', { static: true }) canvasElement: any;
  canvasEl: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;

  freqs: any;

  audioCtx: AudioContext;
  analyser: AnalyserNode;
  source: AudioBufferSourceNode;

  constructor() {
    this.canvasEl = this.canvasElement.nativeElement;

    this.canvasCtx = this.canvasEl.getContext('2d');
  }

  ngOnInit() {

  }

  start() {
    // this.initRecord({ video: true, audio: false });
  }

  initRecord() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((d, i) => console.log(d.label, i));
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: devices[0].deviceId
          }
        })
        .then((stream) => {
          const context = new window.AudioContext();
          const analyser = context.createAnalyser();
          const source = context.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.connect(context.destination);

          this.freqs = new Uint8Array(analyser.frequencyBinCount);

          requestAnimationFrame(this.draw);
        });
    });
  }

  draw() {
    const radius = 75;
    const bars = 100;

    // Draw Background
    this.canvasCtx.fillStyle = 'black';
    this.canvasCtx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    // Draw circle
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(this.canvasEl.width / 2, this.canvasEl.height / 2, radius, 0, 2 * Math.PI);
    this.canvasCtx.stroke();
    this.analyser.getByteFrequencyData(this.freqs);

    // // Draw label
    // this.canvasCtx.font = "500 24px Helvetica Neue";
    // const avg =
    //   [...Array(255).keys()].reduce((acc, curr) => acc + freqs[curr], 0) /
    //   255;
    // this.canvasCtx.fillStyle = "rgb(" + 200 + ", " + (200 - avg) + ", " + avg + ")";
    // this.canvasCtx.textAlign = "center";
    // this.canvasCtx.textBaseline = "top";
    // this.canvasCtx.fillText("SPACE", this.canvasEl.width / 2, this.canvasEl.height / 2 - 24);
    // this.canvasCtx.fillText("FORCE", this.canvasEl.width / 2, this.canvasEl.height / 2 + 6);

    // Draw bars
    for (let i = 0; i < bars; i++) {
      const radians = (Math.PI * 2) / bars;
      const bar_height = this.freqs[i] * 0.5;

      const x = this.canvasEl.width / 2 + Math.cos(radians * i) * radius;
      const y = this.canvasEl.height / 2 + Math.sin(radians * i) * radius;
      const x_end = this.canvasEl.width / 2 + Math.cos(radians * i) * (radius + bar_height);
      const y_end = this.canvasEl.height / 2 + Math.sin(radians * i) * (radius + bar_height);
      const color = 'rgb(' + 200 + ', ' + (200 - this.freqs[i]) + ', ' + this.freqs[i] + ')';
      this.canvasCtx.strokeStyle = color;
      this.canvasCtx.lineWidth = 3;
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(x, y);
      this.canvasCtx.lineTo(x_end, y_end);
      this.canvasCtx.stroke();
    }

    requestAnimationFrame(this.draw);
  }
}
