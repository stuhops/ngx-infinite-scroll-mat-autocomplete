import {
  Directive,
  Output,
  EventEmitter,
  AfterViewInit,
  Host,
  Optional,
  Input,
} from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Directive({
  selector: '[infiniteScrollMatAutocomplete]',
  standalone: true,
})
export class InfiniteScrollMatAutocompleteDirective implements AfterViewInit {
  /**
   * the bottom percentage point of the scroll nob relatively to the infinite-scroll container (i.e, 2 (2 * 10 = 20%) is event is triggered when 80% (100% - 20%) has been scrolled). if container.height is 900px, when the container is scrolled to or past the 720px, it will fire the scrolled event.
   */
  @Input() infiniteScrollDistance: number = 2;
  /**
   * this will callback if the distance threshold has been reached on a scroll down.
   */
  @Output() scrolled = new EventEmitter<void>();
  /**
   * this will fire every time the scroll perc changes
   */
  @Output() scrollPerc = new EventEmitter<number>(); // Emits the scroll percentage

  private _panelOpenTimeout: NodeJS.Timeout | null = null;
  private _scrollDebounce: NodeJS.Timeout | null = null;

  constructor(
    @Host() @Optional() private _autocomplete: MatAutocomplete, // Inject MatAutocomplete
  ) {
    console.warn('Here is the injected autocomplete', this._autocomplete);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this._autocomplete) {
      throw Error('MatAutocompleteScrollPercentageDirective requires MatAutocomplete');
    }

    await this._panelOpened();
    this._addScrollEventListener();
  }

  resetPanelOpenTimeout(resolve: () => any): void {
    if (this._panelOpenTimeout) window.clearTimeout(this._panelOpenTimeout);
    this._panelOpenTimeout = setTimeout(() => {
      if (this._autocomplete?.panel?.nativeElement) resolve();
      else this.resetPanelOpenTimeout(resolve);
    }, 100);
  }

  ngOnDestroy(): void {
    if (this._panelOpenTimeout) window.clearTimeout(this._panelOpenTimeout);
  }

  private _addScrollEventListener(): void {
    const panel = this._autocomplete?.panel?.nativeElement;
    if (!panel) throw Error('Panel must exist here');

    panel.addEventListener('scroll', () => {
      if (this._scrollDebounce) window.clearTimeout(this._scrollDebounce);
      this._scrollDebounce = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = panel;
        const percentageScrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
        this.scrollPerc.emit(Math.min(percentageScrolled, 100)); // Cap at 100%
        this._scrolledHandler({scrollHeight, scrollTop, clientHeight});
      });
    });
  }

  private async _panelOpened(): Promise<void> {
    let panelOpenResolve: () => any = () => {
      throw Error('panelOpenResolve not set');
    };
    const panelOpenPromise = new Promise<void>((resolve) => (panelOpenResolve = resolve));
    this.resetPanelOpenTimeout(panelOpenResolve);
    return panelOpenPromise;
  }

  private _scrolledHandler(options: {
    clientHeight: number;
    scrollTop: number;
    scrollHeight: number;
  }): void {
    const percentageScrolled =
      (options.scrollTop / (options.scrollHeight - options.clientHeight)) * 100;
    if (100 - percentageScrolled < this.infiniteScrollDistance * 10) this.scrolled.emit();
  }
}
