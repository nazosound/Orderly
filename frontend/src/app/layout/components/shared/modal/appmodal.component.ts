import { LangService } from '@/core/services/shared/lang.service';
import { NgIf } from '@angular/common';
import { Component, inject, input, model, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';


@Component({
  imports: [NgIf, DialogModule],
  selector: 'app-modal',
  template: `
    <!-- Modal Background -->
    <p-dialog [header]="title()" [styleClass]="widthClass()" [position]="position()" [draggable]="false" [modal]="true" [(visible)]="isOpen">
        <ng-content></ng-content>
        <div class="mt-4 flex justify-end">
          <button
            *ngIf="showButton()"
            (click)="closeModal()"
            class="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            {{words.CLOSE_BUTTON_TEXT}}
          </button>
        </div> 
    </p-dialog>
  `,
})
export class AppModalComponent {
  words = inject(LangService).words();
  isOpen = model(false);
  title = input<string>('');
  widthClass = input<string>('w-4/12');
  showButton = input<boolean>(true);
  position = input<"center" | "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright">('top');
  close = output();

  closeModal() {
    this.close.emit();
  }
}
