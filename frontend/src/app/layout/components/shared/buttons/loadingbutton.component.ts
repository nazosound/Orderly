import { Constants } from '@/shared/enums/constants';
import { Component, input, Input, signal, Signal } from '@angular/core';


@Component({
    selector: 'app-loading-button',
    template: `
        <button type="submit" [disabled]="loading()"
            class="cursor pointer px-8 flex disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            <i class="fa fa-save text-white mt-1 mr-3"></i>
            {{ loading() ? loadingText : title() }}
        </button>
    `
})
export class LoadingButtonComponent {
    loading = input(false);
    title = input('');
    loadingText = Constants.LOADING;
}