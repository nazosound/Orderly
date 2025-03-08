import { inject, Injectable } from '@angular/core';
import { CategoryInterface } from '../../shared/models/category.interface';
import { ApiService } from './api.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { EndResultInterface } from '../../shared/models/endresult.interface';
import { PaginationInterface } from '../../shared/models/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private reload$ = new BehaviorSubject<number>(1);
  api = inject(ApiService);

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

  getAllCategories(): Observable<PaginationInterface<CategoryInterface[]>> {
    return this.reload$.asObservable().pipe(
      switchMap((page: number) =>
        this.api.httpGet<PaginationInterface<CategoryInterface[]>>(
          `Category/GetAllCategories?page=${page}`
        )
      ),
      map((result) => {
        if (result.result === false) {
          throw new Error(result.message);
        }
        return result.data;
      })
    );
  }

  reloadCategories(page: number): void {
    this.reload$.next(page);
  }
}
