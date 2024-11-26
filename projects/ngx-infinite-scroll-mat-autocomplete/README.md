# Angular Infinite Scroll for Mat Autocomplete

A package to add infinite scrolling to Angular material autocomplete. Designed to imitate <a href="https://github.com/orizens/ngx-infinite-scroll">ngx-infinite-scroll</a> in usage and api.

## Versions

Versions follow Angular's version to easily reflect compatibility. Meaning, for Angular 18, use ngx-infinite-scroll-mat-autocomplete @ ^18.0.0. This project was created for Angular 18 and so does not support versions beneath that.

## Installation

```
npm install --save ngx-infinite-scroll-mat-autocomplete
```

## Supported API

### Properties

| @Input()               | Type   | Required | Default | Description                                                                                                                                                                                                                                                                                           |
| ---------------------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| infiniteScrollDistance | number | optional | 2       | the bottom percentage point of the scroll nob relatively to the infinite-scroll container (i.e, 2 (2 \* 10 = 20%) is event is triggered when 80% (100% - 20%) has been scrolled). if container.height is 900px, when the container is scrolled to or past the 720px, it will fire the scrolled event. |
| infiniteScrollThrottle | number | optional | 150     | should get a number of **milliseconds** for throttle. The event will be triggered this many milliseconds after the user _stops_ scrolling.                                                                                                                                                            |

### Events

| @Output()  | Type         | Event Type | Required | Description                                                                             |
| ---------- | ------------ | ---------- | -------- | --------------------------------------------------------------------------------------- |
| scrolled   | EventEmitter | void       | optional | this will callback if the distance threshold has been reached on a scroll down.         |
| scrollPerc | EventEmitter | number     | optional | this will callback every time the scroll event triggers and give a percentage scrolled. |

## Behavior

The directive listens to the **autocomplete panel scroll** event and invoked the callback.

## Usage

In this example, the **onScroll** callback will be invoked when the mat autocomplete is scrolled down by 80%. The scrollPerc will trigger every time the scroll percentage changes:

```typescript
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { InfiniteScrollMatAutocompleteDirective } from 'ngx-infinite-scroll-mat-autocomplete';

@Component({
  selector: 'app',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollMatAutocompleteDirective,
  ],
  template: `
    <mat-form-field>
      <mat-label>Infinite Scroll Autocomplete</mat-label>
      <input matInput type="text" [formControl]="formControl" [matAutocomplete]="auto" />

      <mat-autocomplete
        #auto="matAutocomplete"
        infiniteScrollMatAutocomplete
        [infiniteScrollDistance]="2" // Default distance but here to show usage
        [infiniteScrollThrottle]="150" // Default distance but here to show usage
        (scrolled)="onScroll()"
        (scrollPerc)="updatedScrollPerc($event)"
      >
        @for (option of options; track option) {
          <mat-option>{{ option }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
})
export class AppComponent {
  formControl = new FormControl<string>('');
  options: string[] = [];

  onScroll(): void {
    console.log('On scroll called');
  }

  updatedScrollPerc(perc: number): void {
    console.log(`Scroll perc updated to ${perc}`);
  }
}
```

## Inspiration

A big thanks again to <a href="https://github.com/orizens/ngx-infinite-scroll">ngx-infinite-scroll</a> for all the hard work they've put into their library and inspiring this one. Go check them out for other great infinite scrolling in Angular.
