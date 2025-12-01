import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Header component for the application layout.
 *
 * Displays the application branding with an icon and title.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-header layout-header />
 * ```
 *
 * @category Layout
 * @see LayoutComponent
 */
@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

