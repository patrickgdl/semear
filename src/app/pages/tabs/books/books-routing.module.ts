import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailsPage } from './book-details/book-details.page';
import { BooksPage } from './books.page';

const routes: Routes = [
  {
    path: '',
    component: BooksPage,
  },
  {
    path: ':id',
    component: BookDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksPageRoutingModule {}
