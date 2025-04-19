import { NgIf } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
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
            Close
          </button>
        </div> 
    </p-dialog>
  `,
})
export class AppModalComponent {
  title = input<string>('');
  isOpen = model(false);
  close = output();
  widthClass = input<string>('w-4/12');
  showButton = input<boolean>(true);
  position = input<"center" | "top" | "bottom" | "left" | "right" | "topleft" | "topright" | "bottomleft" | "bottomright">('top');

  closeModal() {
    this.close.emit();
  }
}
