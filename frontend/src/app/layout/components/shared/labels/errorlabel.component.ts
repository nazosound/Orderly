import { Component, input } from '@angular/core';

@Component({
    selector: 'app-error-label',
    template: `
    @if(errorMessage()) {
        <div class="flex items-center justify-center m-5">
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error: </strong>
                <span class="block sm:inline">{{ errorMessage()?.message }}</span>
            </div>
        </div>
    } 
    `,
    styles: []
})
export class ErrorLabelComponent {
    errorMessage = input<any>();
}