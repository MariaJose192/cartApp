import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
})
export class NavBar {

  @Input() items: CartItem[] = [];

  @Output() openEvent = new EventEmitter();

  openCart(): void {
    this.openEvent.emit();
  }


}
