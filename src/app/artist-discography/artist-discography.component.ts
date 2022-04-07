import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums : any | undefined;
  albumsSub : Subscription | undefined;
  artist : any | undefined;
  artistSub: Subscription | undefined;

  // To convert the date to desired formsat
  dateConvert(releaseDate : any) {
    let tempStr = "";
    if (releaseDate) {
      let tempArr = releaseDate.split("-");
      tempStr = tempArr[1] + "/" + tempArr[2] + "/" + tempArr[0];
    }

    return tempStr;
  }

  constructor(private ms : MusicDataService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.albumsSub = this.ms.getAlbumsByArtistId(id).subscribe(result => this.albums = result.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index));

    this.artistSub = this.ms.getArtistById(id).subscribe(result => this.artist = result); 
  }

  ngOnDestroy(): void {
    this.albumsSub?.unsubscribe();
    this.artistSub?.unsubscribe();
  }

}
