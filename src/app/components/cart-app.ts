import { Component, OnInit, } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { Catalog } from './catalog/catalog';
import { Cart } from './cart/cart';
import { CartItem } from '../models/cartItem';
import { NavBar } from './nav-bar/nav-bar';
import { RouterOutlet, Router } from '@angular/router';
import { SharingData } from '../services/sharing-data';
import swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [Catalog, Cart, NavBar, RouterOutlet],
  templateUrl: './cart-app.html',
})
export class CartApp implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  showCart: boolean = false;

  constructor(private router: Router,
    private sharingData: SharingData,
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.addToCard();
    this.onDeleteCart();
  }


  addToCard(): void {
    this.sharingData.productEvent.subscribe((product: Product) => {
      const hasItem = this.items.find(item => item.product.id === product.id);
      if (hasItem) {
        this.items = this.items.map(item => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
      }
      this.calculateTotal();
      this.saveSession();

      swal.fire({
        title: 'Producto agregado al carrito',
        text: `Has agregado ${product.name} al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    });
  }


  onDeleteCart(): void {
    this.sharingData.idProduct.subscribe(id => {
      this.items = this.items.filter(item => item.product.id !== id);
      this.calculateTotal();
      this.saveSession();

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart'], {
          state: { items: this.items, total: this.total }
        });
      })

    });
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
