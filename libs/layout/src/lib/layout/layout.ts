import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@mini-crm/data-access';

/**
 * Main layout component with responsive structure.
 *
 * Provides the application shell with header, sidebar, and main content area.
 * Automatically hides header and sidebar when user is not authenticated.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-layout>
 *   <lib-header layout-header />
 *   <lib-sidebar layout-sidebar />
 * </lib-layout>
 * ```
 *
 * ### Content Projection
 * - Use `layout-header` attribute to project header content
 * - Use `layout-sidebar` attribute to project sidebar content
 * - Main content is automatically rendered via router-outlet
 *
 * @category Layout
 * @see HeaderComponent
 * @see SidebarComponent
 */
@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  /**
   * Authentication service for checking user authentication state
   * @internal
   */
  protected readonly authService = inject(AuthService);
}
