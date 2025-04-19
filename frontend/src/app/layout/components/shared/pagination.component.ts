import { Component, input, output } from '@angular/core';
import { AppButtonComponent } from './appbutton.component';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="flex justify-start mt-2">
    <div class="inline-flex" role="group" aria-label="Pagination">
        <button type="button" class="px-3 py-2 text-sm text-white bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 rounded-l" [disabled]="loading() ||currentPage() === 1" (click)="setPage(-9999)">
            <i class="fa fa-angle-double-left"></i>
        </button>
        <button type="button" class="px-3 py-2 text-sm text-white bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900" [disabled]="loading() ||currentPage() === 1" (click)="setPage(-1)">
            <i class="fa fa-angle-left"></i>
        </button>
        <button type="button" class="px-3 py-2 text-sm text-white bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            {{currentPage()}} / {{totalPages()}}
        </button>
        <button type="button" class="px-3 py-2 text-sm text-white bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900" [disabled]="loading() ||currentPage() === totalPages()" (click)="setPage(1)">
            <i class="fa fa-angle-right"></i>
        </button>
        <button type="button" class="px-3 py-2 text-sm text-white bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 rounded-r" [disabled]="loading() ||currentPage() === totalPages()" (click)="setPage(9999)">
            <i class="fa fa-angle-double-right"></i>
        </button>
    </div>
    </div> 
  `,
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
