import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {

  @Input() product!: Product;

  @Output() productEvent: EventEmitter<Product> = new EventEmitter();

  addToCart(product: Product) {
    this.productEvent.emit(product);
  }

 
}
