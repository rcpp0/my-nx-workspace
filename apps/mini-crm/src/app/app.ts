import { Component } from '@angular/core';
import {
  LayoutComponent,
  HeaderComponent,
  SidebarComponent,
} from '@mini-crm/layout';

@Component({
  imports: [LayoutComponent, HeaderComponent, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected title = 'mini-crm';
}
