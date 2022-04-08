import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album : any;
  albumSub : Subscription | undefined;

  // To convert the date to desired format
  dateConvert(releaseDate : any) {
    let tempStr = "";
    if(releaseDate) { 
      let tempArr = releaseDate?.split("-");
      tempStr = tempArr[1] + "/" + tempArr[2] + "/" + tempArr[0];
    } 

    return tempStr;
  }

  addToFavourites(trackId : string): void {
    this.ms.addToFavourites(trackId).subscribe((data) => {
        this.msb.open("Adding to Favourites...", "Done", { duration: 1500 });
    },
    (err) => { 
      this.msb.open('Unable to add song to Favourites...', 'Done', {
        duration: 2500,
      });
    });

  }

  constructor(private msb: MatSnackBar, private ms : MusicDataService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.albumSub = this.route.params.subscribe(params => {
      this.ms.getAlbumById(params['id']).subscribe(result => { 
        this.album = result;
      });
    })
  }

  ngOnDestroy(): void {
    this.albumSub?.unsubscribe();
  }

}
