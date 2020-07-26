import { SpeechError } from './speech-error.enum';
import { SpeechEvent } from './speech-event.enum';

export interface SpeechNotification<T> {
  event?: SpeechEvent;
  error?: SpeechError;
  content?: T;
}
