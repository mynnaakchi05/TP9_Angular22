import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, FormRoot } from '@angular/forms/signals';
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

  readonly gameForm = form(this.gameModel);

  onSubmit() {
    console.log(this.gameModel());
  }
}