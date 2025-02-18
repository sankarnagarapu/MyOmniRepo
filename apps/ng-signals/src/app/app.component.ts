import { Component, computed, linkedSignal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  count = 0;

  doubleCount = 0;

  increment() {
    this.count++;
    this.doubleCount = this.count * 2;
  }

  isModalOpen = signal(false);
  isModalOpenv2 = signal(false);

  sCount = signal(0);
  sDoubleCount = computed(() => this.sCount() * 2);

  incrementSignal() {
    this.isModalOpen.update((prev) => !prev);
    this.sCount.update((count) => count + 1);
  }

  pages = signal(['Home', 'About', 'Contact']);

  selectedPage = linkedSignal<string | null>(() => this.pages()[1]);
}
