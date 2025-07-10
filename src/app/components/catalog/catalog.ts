import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
})
export class Catalog {

 @Input() products!: Product[];

 @Output() productEvent: EventEmitter<Product> = new EventEmitter();

 addToCart(product: Product) {
  this.productEvent.emit(product);
 }

}
