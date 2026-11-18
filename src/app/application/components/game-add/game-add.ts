import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, FormRoot, required, pattern, min } from '@angular/forms/signals';
import { signal } from '@angular/core';
import { Game } from '../../models/game';
import { Category } from '../../models/category';

@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [CommonModule, FormRoot, FormField],
  templateUrl: './game-add.html',
  styleUrl: './game-add.css'
})
export class GameAdd {
  categories = Object.values(Category);

  readonly gameModel = signal<Game>({
    id: "",
    name: "",
    price: 0,
    madeIn: "Tunisie",
    category: Category.Puzzle,
    isNew: true,
    shops: []
  });

  readonly gameForm = form(this.gameModel, path => {
    required(path.name, { message: "Nom obligatoire" });
    pattern(path.name, /^[A-Z].+$/, { message: "Le nom doit commencer par une majuscule" });
    required(path.price, { message: "Le prix est obligatoire" });
    min(path.price, 0.1, { message: "Le prix doit être supérieur à 0.1 DT" });
  });

  onSubmit() {
    console.log(this.gameModel());
  }
}