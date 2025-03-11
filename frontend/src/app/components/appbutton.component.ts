import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-btn',
  template: `
    <button
      class="bg-{{
        color()
      }}-800 text-white font-semibold cursor-pointer px-3 rounded-md transition duration-300 hover:bg-{{
        color()
      }}-600 p-2"
    >
      <i class="fa fa-{{ icon() }}"></i> {{ text() }}
    </button>
  `,
})
export class AppButtonComponent {
  icon = input<string>('icon');
  text = input<string>('text');
  color = input<string>('color');
}
