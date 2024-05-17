import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  animes: Array<Anime> = [];
  selected: Boolean = false;

  selectedAnime!: Anime;

  onSelected(anime: Anime): void {
    this.selected = true;
    this.selectedAnime = anime;
  }

  getAnimes(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      this.animes = animes;
    });
  }

  totalEpisodios: number = 0;
  ratingPromedio: number = 0

  calcularRating () : number
  {
      let sumaRating = 0;
      this.animes.forEach((anime) => {
        sumaRating += parseFloat(anime.Rating)

      });

      return sumaRating / this.animes.length

  }

  calcularEpisodios () : number
  {
      
      this.animes.forEach((anime) => {
        this.totalEpisodios+= anime.episode;
    
      });

      return this.totalEpisodios;

  }

 

  constructor(private animeService: AnimeService) { }

  
 
  

  ngOnInit() {
    this.getAnimes();
    this.ratingPromedio = this.calcularEpisodios();
    this.totalEpisodios = this.calcularEpisodios();
  }

}
