import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AppStateService } from '../../../core/services/appstate.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { CategoryInterface } from '../../../shared/models/category.interface';
import { PaginationInterface } from '../../../shared/models/pagination.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [ReactiveFormsModule, NgFor, AsyncPipe, NgIf],
})
export class CategoryComponent {
  categoryForm: FormGroup;
  fb = inject(FormBuilder);
  appState = inject(AppStateService);
  categoryService = inject(CategoryService);
  error = signal<string>('');
  loading = signal<boolean>(false);
  categories$: Observable<PaginationInterface<CategoryInterface[]>>;
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);

  constructor() {
    this.categoryForm = this.fb.group({
      id: [0],
      categoryName: ['', [Validators.required, Validators.maxLength(100)]],
      categoryStatus: [false],
    });
    this.categories$ = this.categoryService.getAllCategories().pipe(
      tap((result) => {
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      })
    );
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.error.set('Invalid Fields');
      return;
    }
    this.loading.set(true);
    this.categoryService.saveCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.error.set('');
        this.loading.set(false);
        this.categoryForm.reset({
          id: 0,
          categoryName: '',
          categoryStatus: false,
        });
        this.currentPage.set(1);
        this.categoryService.reloadCategories(1);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
    });
  }

  setPage(newpage: number) {
    this.currentPage.update((prev) => {
      if (this.totalPages() < prev + newpage) {
        return prev;
      }
      return prev + newpage == 0 ? 1 : prev + newpage;
    });

    this.loading.set(true);
    this.categoryService.reloadCategories(this.currentPage());
  }
}
