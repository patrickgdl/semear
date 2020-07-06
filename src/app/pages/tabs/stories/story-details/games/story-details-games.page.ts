import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-story-details-games',
    templateUrl: './story-details-games.page.html',
    styleUrls: ['./story-details-games.page.scss']
})

export class StoryDetailsGamesPage implements OnInit {

    games = [
        {
            'title': 'Quiz',
            'subtitle': 'História',
            'description': 'Vamos colocar sua memória em prática.',
            'image': 'assets/icon/quiz.svg',
            'page': 'quiz'
        },
        {
            'title': 'Relembrando',
            'subtitle': 'Quer relembrar?',
            'description': 'Complete o teste acima para desbloquear este.',
            'image': 'assets/icon/remember.svg',
            'page': 'remember'
        },
        {
            'title': 'Caça-palavras',
            'subtitle': 'Encontre palavras',
            'description': 'Ao encontrar as palavras você ganha pontos no ranking.',
            'image': 'assets/icon/words.svg',
            'page': 'words'
        }
    ];

    constructor(private router: Router) { }

    ngOnInit() { }

    navigateTo(page: string) {
        const uid = this.router.url.split('/')[2];
        // this.router.navigate([`stories/${uid}/${page}`]);
        if (page === 'quiz') {
            this.router.navigate([`stories/quiz`]);
        }
    }

}
