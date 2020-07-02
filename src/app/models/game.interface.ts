import { Quiz } from './quiz.interface';
import { Remember } from './remember.interface';
import { Word } from './word.interface';

export interface Game {
    uid: string;
    storyUid: string;
    type: 'quiz' | 'remembering' | 'words';
    quizzes?: Quiz[];
    remember?: Remember[];
    words?: Word[];
}
