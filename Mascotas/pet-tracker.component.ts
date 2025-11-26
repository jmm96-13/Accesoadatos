import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-tracker',
  templateUrl: './pet-tracker.component.html',
  styleUrls: ['./pet-tracker.component.css']
})
export class PetTrackerComponent {
  pets = [
    { name: 'Luna', fed: false },
    { name: 'Rocky', fed: true }
  ];
  newPet: string = '';
  filter: 'all' | 'fed' | 'hungry' = 'all';

  addPet() {
    const name = this.newPet.trim();
    if (name.length < 3) return;
    if (this.pets.some(p => p.name.toLowerCase() == name.toLowerCase())) return;
    this.pets.push({ name, fed: false });
    this.newPet = '';
  }
  toggleFed(pet:any){ pet.fed=!pet.fed; }
  deletePet(i:number){ this.pets.splice(i,1); }
  get fedCount(){ return this.pets.filter(p=>p.fed).length; }
  get filteredPets(){
    switch(this.filter){
      case 'fed': return this.pets.filter(p=>p.fed);
      case 'hungry': return this.pets.filter(p=>!p.fed);
      default: return this.pets;
    }
  }
}