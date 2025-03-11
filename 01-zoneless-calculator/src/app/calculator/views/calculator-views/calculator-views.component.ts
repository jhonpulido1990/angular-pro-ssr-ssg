import { Component } from '@angular/core';
import { CalculatorComponent } from "../../components/calculator/calculator.component";

@Component({
  selector: 'app-calculator-views',
  imports: [CalculatorComponent],
  templateUrl: './calculator-views.component.html',
})
export default class CalculatorViewsComponent { }
