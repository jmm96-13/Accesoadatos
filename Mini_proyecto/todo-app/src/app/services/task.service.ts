import { Injectable } from '@angular/core';
import { Pet } from '../model/pet';   // ← equivalente a TaskList

@Injectable({
  providedIn: 'root'
})
export class PetTrackerService {

  private key = 'pets';  // antes: 'tasks'

  constructor() { }

  getPets(): Pet[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  savePets(pets: Pet[]): void {
    localStorage.setItem(this.key, JSON.stringify(pets));
  }
}
