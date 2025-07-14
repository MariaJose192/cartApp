import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';


@Component({
  selector: 'nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.html',
})
export class NavBar {

  @Input() items: CartItem[] = [];

  @Output() openEvent = new EventEmitter();

  @Input() total: number = 0;

  @Input() products: Product[] = [];

  openCart(): void {
    this.openEvent.emit();
  }


}
