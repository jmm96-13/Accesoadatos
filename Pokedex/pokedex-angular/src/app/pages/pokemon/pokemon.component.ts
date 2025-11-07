import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokeapiService } from '../../services/pokeapi.service';
import { PokemonDetail } from '../../models/pokemon-detail';
import { DigitNumberPipe } from '../../pipes/digit-number.pipe';
import { TitleCasePipe } from '@angular/common';
import { PokemonTypeComponent } from '../../components/pokemon-type/pokemon-type.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [DigitNumberPipe, TitleCasePipe, PokemonTypeComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemon: PokemonDetail | null = null;
  routeParamMap$: Subscription | null = null;

  constructor(
    private pokeapi: PokeapiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeParamMap$ = this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      const id = Number(paramMap.get('id'));
      this.pokemon = await this.pokeapi.getPokemonDetail(id);
    });
  }

  ngOnDestroy(): void {
    this.routeParamMap$?.unsubscribe();
  }

  goPrevious() { this.goOtherPokemon(-1); }
  goNext() { this.goOtherPokemon(+1); }

  goOtherPokemon(offset: number) {
    let id = (this.pokemon?.id as number) + offset;
    if (id < 1) id = 151;
    else if (id > 151) id = 1;
    this.router.navigateByUrl(`pokemon/${id}`);
  }
}
