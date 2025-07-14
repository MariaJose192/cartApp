import { Injectable,EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingData {


  private _idProduct: EventEmitter<number> = new EventEmitter();

   private _productEvent: EventEmitter<Product> = new EventEmitter();


  constructor() { }

  get idProduct(): EventEmitter<number> {
    return this._idProduct;
  }

  get productEvent(): EventEmitter<Product> {
    return this._productEvent;
  }
}
