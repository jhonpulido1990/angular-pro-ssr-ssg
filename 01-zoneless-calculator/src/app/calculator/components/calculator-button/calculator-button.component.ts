import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  OnInit,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
  },
})
export class CalculatorButtonComponent {
  public onClick = output<string>();
  public contenValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPresed = signal(false);

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  //@HostBinding('class.is-command') get commandStyle() {
  //  return this.isCommand();
  //}

//  @HostBinding('class.w-2/4') get commandStyle() {
  //  return this.isDoubleSize();
 // }

  handleClick() {
    if (!this.contenValue()?.nativeElement) {
      return;
    }
    const value = this.contenValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  public keyBoardPressedStyle(key: string) {
    if (!this.contenValue()) return;

    const value = this.contenValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPresed.set(true);

    setTimeout(() => {
      this.isPresed.set(false)
    }, 100)
  }
}
