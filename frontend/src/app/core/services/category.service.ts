import { computed, inject, Injectable, linkedSignal, model, ResourceStatus, Signal, signal } from '@angular/core';
import { CategoryInterface } from '@/shared/models/category.interface';
import { EndResultInterface } from '@/shared/models/endresult.interface';
import { PaginationInterface } from '@/shared/models/pagination.interface';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { httpResource } from '@angular/common/http';
import { LangService } from './shared/lang.service';
import { ApiService } from './shared/api.service';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  words = inject(LangService).words();
  api = inject(ApiService);
  currentPage = signal<number>(1);
  search = signal('');


  private categoryResource = httpResource<EndResultInterface<PaginationInterface<CategoryInterface[]>>>(() => ({
    url: this.api.baseUrl + 'Category/GetAllCategories',
    params: {
      page: this.currentPage(),
      search: this.search(),
    },
  }));

  error = computed<any>(() => {
    return this.categoryResource.error();
  });


  categoryList = linkedSignal<CategoryInterface[] | undefined, CategoryInterface[]>({
    source: () => this.categoryResource.value()?.data?.items,
    computation: (newvalue, previous) => {
      if (newvalue) {
        return newvalue;
      }
      return previous?.value as CategoryInterface[];
    }
  });

  totalPages = linkedSignal<number, number>({
    source: () => this.categoryResource.value()?.data?.totalPages ?? 0,
    computation: (newvalue, previous) => {
      if (newvalue) {
        return newvalue;
      }
      return (previous?.value as number);
    }
  });

  loading = computed(() => {
    return this.categoryResource.status() === ResourceStatus.Loading;
  });


  saveCategory(category: CategoryInterface): Observable<CategoryInterface> {
    return this.api
      .httpPost<CategoryInterface>('Category/addCategory', category)
      .pipe(
        map((result: EndResultInterface<CategoryInterface>) => {
          if (result.result === false) {
            throw new Error(result.message);
          }
          return result.data;
        })
      );
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this.api.httpGet<CategoryInterface[]>('Category/getCategories').pipe(
      map((result: EndResultInterface<CategoryInterface[]>) => {
        if (result.result === false) {
          throw new Error(result.message);
        }
        return result.data;
      })
    );
  }

  resetCategoryList() {
    this.currentPage.set(0);
    this.currentPage.set(1);
    this.search.set('');
  }

  categoryTableColumns() {
    return [
      this.words.CATEGORY_TABLE_ITEM_ID,
      this.words.CATEGORY_TABLE_ITEM_CATEGORY_NAME,
      this.words.CATEGORY_TABLE_ITEM_STATUS,
      this.words.CATEGORY_TABLE_ITEM_SELECT
    ];
  }

}
