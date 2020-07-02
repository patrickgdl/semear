export interface Badge {
    uid: string;
    type: 'perfect' | 'writer' | 'reader' | 'champion' | 'focused';
    limit: number;
    progress: number;
}
