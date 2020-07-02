export interface Quiz {
    uid: string;
    type: 'number' | 'text';
    question: string;
    answer: string;
}
