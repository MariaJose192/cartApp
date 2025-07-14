import { Component,OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';
import { Router } from '@angular/router';
import { SharingData } from '../../services/sharing-data';
import { ProductService } from '../../services/product';


@Component({
  selector: 'catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {

  products!: Product[];



  constructor(
    private productService: ProductService,
    private sharingData: SharingData,
     private router: Router
    ) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.products = this.router.getCurrentNavigation()?.extras.state!['products'];
      if (!this.products) {
        console.error('No hay productos disponibles en el catálogo.');
      }
    }
  }
    ngOnInit(): void {
      if(!this.products){
        this.products = this.productService.findAll();
      }
    }

  addToCart(product: Product) {
    console.log('📥 Catalog recibió producto:', product); // 👈 este log es clave
    this.sharingData.productEvent.emit(product);
  }
}
