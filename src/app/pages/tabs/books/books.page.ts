import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from '@models/story.interface';
import { DbService } from 'app/services/firebase/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: 'books.page.html',
  styleUrls: ['books.page.scss'],
})
export class BooksPage implements OnInit {
  stories$: Observable<Story[]>;
  slideConfig = {
    spaceBetween: 5,
    slidesPerView: 2.2,
  };

  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {
    this.stories$ = this.dbService.collection$('stories');
  }

  goToDetail(uid: string) {
    this.router.navigate([`books/${uid}`]);
  }
}
