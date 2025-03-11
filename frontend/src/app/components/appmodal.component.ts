import { NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  imports: [NgIf],
  selector: 'app-modal',
  template: `
    <!-- Modal Background -->
    <div
      *ngIf="isOpen()"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
      (click)="closeModal()"
    >
      <!-- Modal Container -->
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-96"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-2">
          <h2 class="text-lg font-semibold">{{ title() }}</h2>
          <button
            (click)="closeModal()"
            class="text-gray-600 hover:text-red-500"
          >
            ✖
          </button>
        </div>

        <!-- Modal Content -->
        <div class="mt-4">
          <ng-content></ng-content>
        </div>

        <!-- Modal Footer -->
        <div class="mt-4 flex justify-end">
          <button
            *ngIf="showButton()"
            (click)="closeModal()"
            class="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Agrega una animación de entrada opcional */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes scaleUp {
        from {
          transform: scale(0.9);
        }
        to {
          transform: scale(1);
        }
      }

      div[*ngIf] {
        animation: fadeIn 0.2s ease-in-out, scaleUp 0.2s ease-in-out;
      }
    `,
  ],
})
export class AppModalComponent {
  title = input<string>('');
  isOpen = input<boolean>(false);
  close = output();
  showButton = input<boolean>(true);

  closeModal() {
    this.close.emit();
  }
}
