import { Component, input, output } from '@angular/core';
import { AppButtonComponent } from './appbutton.component';

@Component({
    selector: 'app-pagination',
    template: `
    <div class="flex gap-2 mt-2 p-2 mb-4 items-center ">
      <app-btn  [disabled]="loading()" (onClick)="setPage(-1)">
        Prev
      </app-btn>
      <b class="text-xs">{{ currentPage() }} of {{ totalPages() }}</b>
      @if(currentPage() != totalPages()){
        <app-btn  [disabled]="loading() || totalPages() == currentPage()" (onClick)="setPage(1)" >Next</app-btn>
      }
    </div>
  `,
    styles: [``],
    imports: [AppButtonComponent]
})
export class PaginationComponent {
    totalPages = input<number>();
    currentPage = input<number>();
    loading = input<boolean>(false);
    changePage = output<number>();
    setPage(page: number) {
        this.changePage.emit(page);
    }
}
