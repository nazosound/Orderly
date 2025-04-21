import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, TemplateRef, contentChild, input, output, model, inject } from '@angular/core';
import { Constants } from '@/shared/enums/constants';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { ErrorLabelComponent } from '../labels/errorlabel.component';
import { LangService } from '@/core/services/shared/lang.service';

@Component({
    selector: 'app-orderly-table',
    standalone: true,
    imports: [NgStyle, NgFor, ErrorLabelComponent, PaginationComponent, FormsModule, CommonModule],
    template: `

    <div class="w-full">
        <div class="relative  flex-grow">
          <input type="text" [placeholder]="words.INPUT_SEARCH_PLACEHOLDER" [(ngModel)]="searchText"
            (ngModelChange)="searchText() == '' ? searchData.emit('') : null"
            class="pl-10 pr-4 py-2 border  border-gray-300 rounded-md bg-white shadow-sm text-sm focus:outline-gray-800 focus:ring-gray-800 focus:border-gray-800 w-full"
            (keydown.enter)="search($event)" />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fa fa-search text-gray-400"></i>
          </div>
        </div>
        
        
    @if(data() && data().length > 0 && error() != '') {
        <table class="min-w-full divide-y shadow divide-gray-200 mt-2 w-full"
            [ngStyle]="{ opacity: loading() ? '0.5' : '1' }">
        <thead class="bg-gray-50">
            <tr>
                <th *ngFor="let col of columns()"
                    class="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ col }}
                </th>
            </tr>
        </thead>
        @if(rowTemplate() != null){ 
            <tbody class="bg-white divide-y divide-gray-200">
                <ng-container *ngFor="let item of data()">
                    <ng-container *ngTemplateOutlet="rowTemplate()!;context: { $implicit: item }"></ng-container>
                </ng-container>
            </tbody>
        }
        </table>
    }@else {
        @if(!loading()) {
            <div class="flex items-center justify-center m-5">
                <p class="text-gray-500">{{words.NO_DATA_FOUND}}</p>
            </div> 
        <app-error-label [errorMessage]="error()"></app-error-label>
        }
    }

    @if(totalPages() >= 1 || loading()) {
    <app-pagination [currentPage]="currentPage()" [totalPages]="totalPages()"
        [loading]="loading()" (changePage)="selectPage($event)"></app-pagination>
    }

    </div>
  `
})
export class TableComponent<T = any> {

    words = inject(LangService).words();
    rowTemplate = contentChild(TemplateRef);
    searchText = model<string>('');
    columns = input<string[]>([]);
    data = input<T[]>([]);
    loading = input<boolean>(false);
    error = input<string>('');
    currentPage = input<number>(1);
    totalPages = input<number>(0);
    changePage = output<number>();
    searchData = output<string>();

    search(event: Event) {
        event.preventDefault();
        this.searchData.emit(this.searchText());
    }

    selectPage(newpage: number) {
        this.changePage.emit(newpage);
    }
}
