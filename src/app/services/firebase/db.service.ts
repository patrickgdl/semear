import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  private col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  private doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map(a => a.payload.doc.data()) as T[];
      }));
  }

   /**
   * @param  {DocPredicate<T>} ref path or ref to document
   *
   *     Returns an observable - usage:
   *     this.db.doc$('notes/id') or
   *     this.db.col$('notes', ref => ref.where('user', '==', 'Patrick'))
   **/
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(
      map(doc => {
        return doc.payload.data() as T;
      }));
  }

  colWithId$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...<any>data };
        });
      }));
  }

  docWithId$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data();
        const uid = a.payload.id;
        return { uid, ...<any>data };
      }));
  }

  /**
   * @param  {string} path 'collection' or 'collection/docID'
   * @param  {object} data new data
   *
   * Creates or updates data on a collection or document.
   **/
  updateAt(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter((v) => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data);
    } else {
      // Even is always document
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  /**
   * @param  {string} path path to document
   *
   * Deletes document from Firestore
   **/
  delete(path: string) {
    return this.afs.doc(path).delete();
  }
}
