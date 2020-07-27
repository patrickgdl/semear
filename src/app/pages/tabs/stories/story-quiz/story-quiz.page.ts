import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-story-quiz',
  templateUrl: './story-quiz.page.html',
  styleUrls: ['./story-quiz.page.scss']
})
export class StoryQuizPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;

  answerSelected: number | null;
  page = 1;
  hideButton: number;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: StoryQuizPage,
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }

  // dismiss() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }

  answer(answer: number) {
    this.answerSelected = answer;
  }

  nextQuestion() {
    this.answerSelected = null;
    this.slides.slideNext();
  }

  changeSlide(event: any) {
    this.page++;
  }

}
