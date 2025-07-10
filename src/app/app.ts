import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartApp } from "./components/cart-app";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartApp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'cartApp';
}
