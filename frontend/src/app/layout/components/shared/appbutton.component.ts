import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-btn',
  template: `
    <button
    (click)="emit()"
    [disabled]="loading()"
    class="bg-{{color()}}-800 text-xs text-white font-semibold cursor-pointer px-2 rounded-md transition duration-300 hover:bg-{{color()}}-600 {{padding()}} disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed disabled:pointer-events-none"
    >
    @if(icon()){
      <i class="fa fa-{{icon()}}"></i> 
    }
      <ng-content></ng-content>
    </button>
  `,
})
export class AppButtonComponent {
  icon = input<string>();
  color = input<string>('gray');
  disabled = input<boolean>(false);
  padding = input<string>('p-1');
  loading = computed(() => this.disabled());
  onClick = output<void>();


  emit() {
    if (!this.loading()) {
      this.onClick.emit();
    }
  }
}
