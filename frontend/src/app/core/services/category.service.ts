import { inject, Injectable } from '@angular/core';
import { CategoryInterface } from '../../shared/models/category.interface';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private reload$ = new BehaviorSubject<void>(undefined);
  api = inject(ApiService);

  saveCategory(category: CategoryInterface): Observable<CategoryInterface> {
    return this.api.httpPost<CategoryInterface>(
      'Category/addCategory',
      category
    );
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this.reload$
      .asObservable()
      .pipe(
        switchMap(() =>
          this.api.httpGet<CategoryInterface[]>('Category/getCategories')
        )
      );
  }

  reloadCategories(): void {
    this.reload$.next();
  }
}
