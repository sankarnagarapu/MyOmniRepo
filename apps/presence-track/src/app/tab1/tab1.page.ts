import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { PresenceService } from '../services/presence.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonButton,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    DatePipe,
    IonSpinner,
  ],
})
export class Tab1Component {
  private firestore = inject(AngularFirestore);
  private presence = inject(PresenceService);
  private auth = inject(AngularFireAuth);
  statuses$ = this.firestore
    .collection<{
      uid: string;
      status: string;
      timestamp: number;
      displayDate: string;
    }>('status')
    .valueChanges({ idField: 'id' });

  statuses = toSignal(this.statuses$);

  status = toSignal(this.presence.getPresence('guUwb8DvPubIsLM2BFmMNoRToYr2'));

  loginLoading = signal(false);
  logoutLoading = signal(false);

  isUserLoggedIn = toSignal(this.auth.authState.pipe(map((user) => !!user)), {
    initialValue: false,
  });

  async login() {
    if (this.loginLoading()) {
      return;
    }
    this.loginLoading.set(true);
    await this.presence.signIn('9398068299@sankar.com', '12345678');
    this.loginLoading.set(false);
  }
  async logout() {
    if (this.logoutLoading()) {
      return;
    }
    this.logoutLoading.set(true);
    await this.presence.signOut();
    this.logoutLoading.set(false);
  }
}
