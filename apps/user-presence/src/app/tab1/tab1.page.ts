import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
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
  ],
})
export class Tab1Component {
  presence = inject(PresenceService);
  firestore = inject(AngularFirestore);
  database = inject(AngularFireDatabase);
  auth = inject(AngularFireAuth);
  status$ = this.presence.getPresence('1VPHRLsgSUdHrA9yfcgfGBunnnH3');
  status = toSignal(this.status$, { initialValue: null });

  user = toSignal(this.auth.authState);
  async login() {
    await this.presence.signIn(
      '9666066831@delivery.com',
      '5fdc6c1923d34b1a8c0814602fbd47af'
    );
  }
  async logout() {
    await this.presence.signOut();
  }
}
