import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Sidebar component for the application navigation.
 *
 * Provides vertical navigation menu with links to main features.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-sidebar layout-sidebar />
 * ```
 *
 * @category Layout
 * @see LayoutComponent
 */
@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}

