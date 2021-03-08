import {
    fromEvent,
    Observable,
    Subscription  } from "rxjs";
  import {
    finalize,
    shareReplay,
    startWith,
    withLatestFrom  } from "rxjs/operators";

  export function dirtyCheck<U>(source: Observable<boolean>=null) {


    let subscription: Subscription;
    let isDirty = false;

    const isDirty$ = source.pipe(
      finalize(() => subscription.unsubscribe()),
      startWith(false),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    subscription = fromEvent(window, "beforeunload")
      .pipe(withLatestFrom(isDirty$))
      .subscribe(([event, isDirty]) => {
        console.log(event, isDirty)
       return isDirty && (event.returnValue = false)
      });

    return isDirty$;
  }
