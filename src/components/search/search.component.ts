import { Component, ChangeDetectionStrategy, output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  citySearch = output<string>();
  searchQuery: WritableSignal<string> = signal('');

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (query) {
      this.citySearch.emit(query);
    }
  }

  handleInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
