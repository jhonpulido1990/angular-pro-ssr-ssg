import { Injectable, signal } from '@angular/core';

const numembers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['+', '-', '*', '/'];
const specialOperator = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  public resultText = signal('5416468');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public contructNumber(value: string): void {
    if (![...numembers, ...operator, ...specialOperator].includes(value)) {
      console.log('Invalid input', value);
      return;
    }
    if (value === '=') {
      console.log('calcular el resultado');
      return;
    }
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('0');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update((v) => v.slice(0, -1));
      return;
    }

    if (operator.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.update((text) => text + '0.');
        return;
      }
      this.resultText.update((text)=> text + '.');
      return;
    }
  }
}
