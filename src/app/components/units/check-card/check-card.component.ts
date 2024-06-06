import { TitleCasePipe } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-check-card',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckCardComponent),
      multi: true
    }
  ],
  templateUrl: './check-card.component.html',
  styleUrl: './check-card.component.css'
})
export class CheckCardComponent implements ControlValueAccessor {
  label = input.required<string>();
  value!: boolean;
  disabled = false;
  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.value = obj;
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
