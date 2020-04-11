import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StrengthPipe } from './strength/strength.pipe';

@NgModule({
  imports: [CommonModule ],
  exports: [ CommonModule, FormsModule, StrengthPipe ],
  declarations: [ StrengthPipe ]
})
export class SharedModule { }
