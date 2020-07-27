import { Component, OnInit } from '@angular/core';
import { defaultLanguage, languages } from '@models/languages';
import { SpeechError } from '@models/speech-error.enum';
import { SpeechEvent } from '@models/speech-event.enum';
import { merge, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SpeechRecognizerService } from '../../services/web-apis/speech-recognizer.service';

@Component({
  selector: 'app-web-speech',
  templateUrl: './web-speech.page.html',
  styleUrls: ['./web-speech.page.scss']
})
export class WebSpeechPage implements OnInit {
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage; // Set the default language
  totalTranscript: string | undefined; // The variable to accumulate all the recognized texts

  transcript$: Observable<string>; // Shows the transcript in "real-time"
  listening$: Observable<boolean>; // Changes to 'true'/'false' when the recognizer starts/stops
  errorMessage$: Observable<string>; // An error from the Speech Recognizer
  defaultError$ = new Subject<undefined>(); // Clean-up of the previous errors

  constructor(private speechService: SpeechRecognizerService) {}

  ngOnInit(): void {
    // Initialize the speech recognizer with the default language
    this.speechService.initialize(this.currentLanguage);
    // Prepare observables to "catch" events, results and errors.
    this.initRecognition();
  }

  start(): void {
    if (this.speechService.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechService.start();
  }

  stop(): void {
    this.speechService.stop();
  }

  selectLanguage(language: string): void {
    if (this.speechService.isListening) {
      this.stop();
    }

    this.currentLanguage = language;
    this.speechService.setLanguage(this.currentLanguage);
  }

  private initRecognition(): void {
    // "transcript$" now will receive every text (interim result) from the Speech API.
    // Also, for every "Final Result" (from the speech), the code will append that text to the existing Text Area component.
    this.transcript$ = this.speechService.onResult().pipe(
      tap((notification) => {
        if (notification.event === SpeechEvent.FinalContent) {
          this.totalTranscript = this.totalTranscript ? `${this.totalTranscript}\n${notification.content?.trim()}` : notification.content;
        }
      }),
      map((notification) => notification.content || '')
    );

    // "listening$" will receive 'true' when the Speech API starts and 'false' when it's finished.
    this.listening$ = merge(this.speechService.onStart(), this.speechService.onEnd()).pipe(
      map((notification) => notification.event === SpeechEvent.Start)
    );

    // "errorMessage$" will receive any error from Speech API and it will map that value to a meaningful message for the user
    this.errorMessage$ = merge(this.speechService.onError(), this.defaultError$).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Não é possível executar a demonstração.
            Seu navegador não está autorizado a acessar seu microfone.
            Verifique se o seu navegador tem acesso ao seu microfone e tente novamente.`;
            break;
          case SpeechError.NoSpeech:
            message = `Nenhuma fala foi detectada. Por favor, tente novamente.`;
            break;
          case SpeechError.AudioCapture:
            message = `O microfone não está disponível. Verifique a conexão do seu microfone e tente novamente.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }
}
