import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DbService } from 'app/services/firebase/db.service';
import { Observable } from 'rxjs';

import { leftJoinDocument } from '../operators/left-join-document.operator';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  constructor(private afs: AngularFirestore, private dbService: DbService) {}

  get(storyUid: string): Observable<any[]> {
    return this.dbService
      .colWithId$<any>(`stories/${storyUid}/discussions`, (r) => r.orderBy('date', 'desc'))
      .pipe(leftJoinDocument(this.afs, 'userUid', 'users'));
  }
}
