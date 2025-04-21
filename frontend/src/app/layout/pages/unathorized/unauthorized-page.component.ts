import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-unauthorized-page',
    imports: [RouterModule],
    template: `
        <div class="unauthorized-page">
            <h1>Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
            <a [routerLink]="['/dashboard']">Go back to Home</a>
        </div>
    `,
    styles: [`
        .unauthorized-page {
            text-align: center;
            margin-top: 50px;
        }
        .unauthorized-page h1 {
            font-size: 2.5rem;
            color: #ff0000;
        }
        .unauthorized-page p {
            font-size: 1.2rem;
            margin: 20px 0;
        }
        .unauthorized-page a {
            font-size: 1rem;
            color: #007bff;
            text-decoration: none;
        }
        .unauthorized-page a:hover {
            text-decoration: underline;
        }
    `]
})
export class UnauthorizedPage { }