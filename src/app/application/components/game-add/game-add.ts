import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, FormRoot, required, pattern, min, applyEach, minLength } from '@angular/forms/signals';
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
    applyEach(path.shops, shop => {
      required(shop, { message: "Le nom du point de vente est obligatoire" });
      minLength(shop, 2, { message: "Taille minimale: 2 caractères" });
    });
  });

  onAddShop() {
    this.gameModel.update(game => ({
      ...game,
      shops: [...game.shops, '']
    }));
  }

  onRemoveShop(index: number) {
    this.gameModel.update(game => ({
      ...game,
      shops: game.shops.filter((_, i) => i !== index)
    }));
  }

  onReset() {
    this.gameModel.set({
      id: "",
      name: "",
      price: 0,
      madeIn: "Tunisie",
      category: Category.Puzzle,
      isNew: true,
      shops: []
    });
    this.gameForm().reset();
  }

  onSubmit() {
    console.log(this.gameModel());
  }
}