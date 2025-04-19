import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, signal } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Constants } from "@/shared/enums/constants";
import { CategoryInterface } from "@/shared/models/category.interface";
import { AppModalComponent } from "@/layout/components/shared/appmodal.component";
import { CategoryService } from "@/core/services/category.service";

@Component({
    selector: 'app-category-modal',
    templateUrl: './category-modal.component.html',
    imports: [
        AppModalComponent,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryModalComponent {

    categoryForm: FormGroup;
    fb = inject(FormBuilder);
    isModalOpen = model(false);
    loading = signal<boolean>(false);
    error = signal<string>('');
    categoryService = inject(CategoryService);

    category = input<CategoryInterface | null>(null);
    saved = output<CategoryInterface | null>();


    constructor() {
        this.categoryForm = this.fb.group(this.initForm());
        effect(() => {
            if (this.category() != null) {
                this.categoryForm.patchValue(this.category()!);
                this.isModalOpen.set(true);
            }
        });
    }

    initForm() {
        return {
            id: [0],
            categoryName: ['', [Validators.required, Validators.maxLength(100)]],
            categoryStatus: [false],
        };
    }

    saveCategory(): void {
        if (this.categoryForm.invalid) {
            this.categoryForm.markAllAsTouched();
            this.error.set(Constants.INVALID_FIELDS);
            return;
        }
        this.loading.set(true);
        this.categoryService.saveCategory(this.categoryForm.value).subscribe({
            next: () => {
                this.resetForm();
                this.categoryService.reloadCategories(1, '');
                this.saved.emit(this.categoryForm.value);
            },
            error: (error) => {
                this.error.set(error.message);
                this.loading.set(false);
            },
        });
    }

    resetForm() {
        this.categoryForm.reset({
            id: 0,
            categoryName: '',
            categoryStatus: false,
        });
        this.error.set('');
        this.loading.set(false);
    }
}