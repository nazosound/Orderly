import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppButtonComponent } from '@/layout/components/shared/buttons/appbutton.component';
import { CategoryModalComponent } from './edit-category/category-modal.component';
import { CategoryInterface } from '@/shared/models/category.interface';
import { CategoryService } from '@/core/services/category.service';
import { TableComponent } from '@/layout/components/shared/table/table.component';
import { LangService } from '@/core/services/shared/lang.service';

@Component({
  selector: 'app-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  imports: [AppButtonComponent, CategoryModalComponent, FormsModule, TableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent {
  //--
  words = inject(LangService).words();
  categoryService = inject(CategoryService);
  isModalOpen = signal<boolean>(false);
  selectedCategory = signal<CategoryInterface | null>(null);


  setPage(newpage: number) {
    this.categoryService.currentPage.update((prevpage) => {
      const newValue = prevpage + newpage;
      if (newValue <= 0) return 1;
      if (newValue > this.categoryService.totalPages()) return this.categoryService.totalPages();
      return newValue;
    });
  }

  selectCategory(category: CategoryInterface) {
    this.selectedCategory.set(category);
    this.isModalOpen.set(true);
    this.categoryService.search.set('');
  }

  searchCategory(searchText: string) {
    this.categoryService.currentPage.set(1);
    this.categoryService.search.set(searchText);
  }

  resetStatus() {
    this.categoryService.resetCategoryList();
    this.isModalOpen.set(false);
  }
}
