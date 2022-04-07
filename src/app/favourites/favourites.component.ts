import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourities : Array<any> = [];
  favouritiesSub : Subscription | undefined;

  removeFromFavourites(id : string) : void {
    this.ms.removeFromFavourites(id).subscribe(data => this.favourities = data.tracks);
  }

  constructor(private ms: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.favouritiesSub = this.ms.getFavourites().subscribe(data => this.favourities = data.tracks);
  }

}
