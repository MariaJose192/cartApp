import { Component,Input, Output,EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart {

  @Input() itemsCart: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProduct = new EventEmitter();

  onDeleteCart(id: number) {
    this.idProduct.emit(id);
  }


}
