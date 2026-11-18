import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { signal } from '@angular/core';
import { Employe } from '../../models/employe';
import { Poste, Departement } from '../../models/types';

@Component({
  selector: 'app-employe-add',
  standalone: true,
  imports: [CommonModule, FormRoot, FormField],
  templateUrl: './employe-add.html',
  styleUrl: './employe-add.css'
})
export class EmployeAdd {
  postes = Object.values(Poste);

  readonly employeModel = signal<Employe>({
    id: "",
    matricule: "",
    nom: "",
    affiliation: {
      poste: Poste.Secrétaire,
      departement: Departement.Finance
    },
    diplomes: []
  });

  readonly employeForm = form(this.employeModel);

  onSubmit() {
    console.log(this.employeModel());
  }
}