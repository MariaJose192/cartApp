import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.html',
})
export class Cart {

  itemsCart: CartItem[] = [];
  total: number = 0;


  constructor(private sharingData: SharingData, private router: Router) {
    this.itemsCart = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
  onDeleteCart(id: number) {
    this.sharingData.idProduct.emit(id);
  }


}
