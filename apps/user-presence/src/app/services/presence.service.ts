import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { serverTimestamp } from '@angular/fire/database';
import { firstValueFrom, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private database = inject(AngularFireDatabase);
  private auth = inject(AngularFireAuth);

  constructor() {
    this.updateOnUser().subscribe();
    this.updateOnDisConnect().subscribe();
  }

  getPresence(uid: string) {
    return this.database
      .object<{ status: 'online' | 'offline'; timestamp: number }>(
        `status/${uid}`
      )
      .valueChanges();
  }

  getUser() {
    return firstValueFrom(this.auth.authState);
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.database
        .object(`status/${user.uid}`)
        .update({ status, timestamp: serverTimestamp() });
    }
  }

  updateOnUser() {
    const connection = this.database
      .object('.info/connected')
      .valueChanges()
      .pipe(map((connected) => (connected ? 'online' : 'offline')));

    return this.auth.authState.pipe(
      switchMap((user) => (user ? connection : of('offline'))),
      tap((status) => this.setPresence(status))
    );
  }

  async signOut() {
    await this.setPresence('offline');
    await this.auth.signOut();
  }

  async signIn(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  updateOnDisConnect() {
    return this.auth.authState.pipe(
      tap((user) => {
        if (user) {
          this.database
            .object(`status/${user.uid}`)
            .query.ref.onDisconnect()
            .update({ status: 'offline', timestamp: serverTimestamp() });
        }
      })
    );
  }
}
