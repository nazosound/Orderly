import { Component, inject, model, signal } from '@angular/core';
import { AppStateService } from '../../../core/services/appstate.service';

import { CategoryService } from '../../../core/services/category.service';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { CategoryInterface } from '../../../shared/models/category.interface';
import { PaginationInterface } from '../../../shared/models/pagination.interface';
import { AppButtonComponent } from '../../components/shared/appbutton.component';
import { AppModalComponent } from '../../components/shared/appmodal.component';
import { Constants } from '../../../shared/enums/constants';
import { PaginationComponent } from '../../components/shared/pagination.component';
import { CategoryModalComponent } from './modal-category/category-modal.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [
    AsyncPipe,
    NgIf,
    AppButtonComponent,
    PaginationComponent,
    NgStyle,
    CategoryModalComponent,
    FormsModule
  ],
})
export class CategoryComponent {
  // private variables Region
  categories$: Observable<PaginationInterface<CategoryInterface[]>>;
  // Services Region
  appState = inject(AppStateService);
  categoryService = inject(CategoryService);
  // Signal Region
  loading = signal<boolean>(false);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  isModalOpen = signal<boolean>(false);
  selectedCategory = signal<CategoryInterface | null>(null);
  search = model('');

  constructor() {
    this.categories$ = this.getAllCategories();
  }

  // Use Cases

  getAllCategories() {
    return this.categoryService.getAllCategories().pipe(
      tap((result) => {
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      })
    );
  }
  // Control
  setPage(newpage: number) {
    this.currentPage.update((prev) => {
      if (this.totalPages() < prev + newpage) {
        return this.totalPages();
      }
      let newPage = prev + newpage;
      return newPage <= 0 ? 1 : newPage > this.totalPages() ? this.totalPages() : newPage;
    });
    this.loading.set(true);
    this.categoryService.reloadCategories(this.currentPage(), this.search());
  }
  selectCategory(category: CategoryInterface) {
    this.selectedCategory.set(category);
    this.isModalOpen.set(true);
    this.search.set('');
  }

  searchCategory(event: Event) {
    this.currentPage.set(1);
    this.categoryService.reloadCategories(this.currentPage(), this.search());
  }

  resetStatus() {
    this.currentPage.set(1);
    this.search.set('');
    this.isModalOpen.set(false);
  }
}
