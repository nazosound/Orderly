import { Component, inject, signal } from '@angular/core';
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
import { AppButtonComponent } from '../../components/shared/appbutton.component';
import { AppModalComponent } from '../../components/shared/appmodal.component';
import { Constants } from '../../../shared/enums/constants';
import { PaginationComponent } from '../../components/shared/pagination.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    AppButtonComponent,
    AppModalComponent,
    PaginationComponent
  ],
})
export class CategoryComponent {
  // private variables Region
  categoryForm: FormGroup;
  categories$: Observable<PaginationInterface<CategoryInterface[]>>;
  // Services Region
  fb = inject(FormBuilder);
  appState = inject(AppStateService);
  categoryService = inject(CategoryService);
  // Signal Region
  error = signal<string>('');
  loading = signal<boolean>(false);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  isModalOpen = signal<boolean>(false);

  constructor() {
    this.categoryForm = this.fb.group(this.initForm());
    this.categories$ = this.getAllCategories();
  }

  // Use Cases
  saveCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.error.set(Constants.INVALID_FIELDS);
      return;
    }
    this.loading.set(true);
    this.categoryService.saveCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.resetStatus();
        this.categoryService.reloadCategories(1);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
    });
  }
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
        return prev;
      }
      return prev + newpage == 0 ? 1 : prev + newpage;
    });
    this.loading.set(true);
    this.categoryService.reloadCategories(this.currentPage());
  }
  initForm() {
    return {
      id: [0],
      categoryName: ['', [Validators.required, Validators.maxLength(100)]],
      categoryStatus: [false],
    };
  }
  resetStatus() {
    this.error.set('');
    this.loading.set(false);
    this.currentPage.set(1);
    this.isModalOpen.set(false);
    this.categoryForm.reset({
      id: 0,
      categoryName: '',
      categoryStatus: false,
    });
  }
}
