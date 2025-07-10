import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { Catalog } from './catalog/catalog';
import { Cart } from './cart/cart';
import { CartItem } from '../models/cartItem';
import { NavBar } from './nav-bar/nav-bar';
@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [Catalog, Cart, NavBar],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  showCart: boolean = false;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.calculateTotal();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    if (this.items.length > 0) {
      this.calculateTotal();
    }
  }

  addToCard(product: Product) {
    const hasItem = this.items.find(item => {
      return item.product.id === product.id;
    })
    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession();

  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculateTotal();
    this.saveSession();

  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) =>
      accumulator + (item.product.price * item.quantity), 0
    )
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart(): void {
    this.showCart = !this.showCart;
  }
}
