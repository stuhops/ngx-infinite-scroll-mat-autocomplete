# NGX Infinite Scroll Mat Autocomplete

## Angular Version Compatibility

This package is designed to be compatible with Angular 15 and all future versions. The peer dependencies are set with a minimum version of Angular 15.0.0 using the `>=` range operator, which means:

- ✅ Works with Angular 15, 16, 17, 18, 19, 20, and beyond
- ✅ No need to update this package for each new Angular version
- ✅ Automatically compatible with future Angular releases

### Why Angular 15+?

Angular 15 introduced stable standalone components, which this directive uses. The directive's simple implementation (using only core Angular decorators and Material components) ensures forward compatibility.

## Installation

```bash
npm install ngx-infinite-scroll-mat-autocomplete
```

The package will work with any Angular version >= 15.0.0. NPM may show peer dependency warnings for newer Angular versions, but these can be safely ignored as the package is designed for forward compatibility.

## Usage

This directive adds infinite scrolling capabilities to Angular Material's `mat-autocomplete` component.

### Basic Example

```typescript
import { InfiniteScrollMatAutocompleteDirective } from 'ngx-infinite-scroll-mat-autocomplete';

@Component({
  // ...
  imports: [InfiniteScrollMatAutocompleteDirective]
})
export class YourComponent {
  onScroll() {
    // Load more items
  }
}
```

```html
<mat-autocomplete
  infiniteScrollMatAutocomplete
  (scrolled)="onScroll()"
  [infiniteScrollDistance]="2"
  [infiniteScrollThrottle]="150">
  <!-- autocomplete options -->
</mat-autocomplete>
```

### API

- `infiniteScrollDistance` (number, default: 2): The distance from the bottom (in percentage * 10) at which the scroll event triggers
- `infiniteScrollThrottle` (number, default: 150): Throttle time in milliseconds
- `scrolled` (EventEmitter): Emitted when scroll threshold is reached
- `scrollPerc` (EventEmitter<number>): Emits the current scroll percentage

For more details, see <a href="https://www.npmjs.com/package/ngx-infinite-scroll">ngx-infinite-scroll</a> for similar usage patterns.
