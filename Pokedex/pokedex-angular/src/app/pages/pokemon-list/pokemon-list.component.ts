import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { DigitNumberPipe } from '../../pipes/digit-number.pipe';
import { PokemonTypeComponent } from '../../components/pokemon-type/pokemon-type.component';
import { PokeapiService } from '../../services/pokeapi.service';

type Pokemon = { id:number; name:string; imageUrl:string; types:string[] };

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [RouterModule, FormsModule, TitleCasePipe, DigitNumberPipe, PokemonTypeComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  allPokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  query = '';
  error: string | null = null;

  constructor(private pokeApi: PokeapiService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.allPokemons = await this.pokeApi.getAllPokemon();
      this.search();
    } catch (e) {
      this.error = 'No se pudo cargar la lista (revisa la consola del navegador).';
      this.filteredPokemons = [];
    }
  }

  search() {
    const q = this.query.trim().toLowerCase();
    this.filteredPokemons = q
      ? this.allPokemons.filter(p => p.name.includes(q))
      : this.allPokemons;
  }
}
