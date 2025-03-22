import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

@Component({
  selector: 'app-calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {

  public calculatorbutton = viewChildren(CalculatorButtonComponent); // todos los hijos

  handleClick(key: string) {
    console.log({ key });
  }

  /* @HostListener('document:keyup', ['$event']) */
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'X',
      '/': '÷',
      Enter: '=',
    };

    const key = event.key;

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorbutton().forEach( button => {
      button.keyBoardPressedStyle(keyValue);
    } )
  }
}

