import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() product!: Product;
  @Output() productEvent = new EventEmitter<Product>();

  addToCart() {
  console.log('📦 Emitiendo producto:', this.product);
  this.productEvent.emit(this.product);
}
}

