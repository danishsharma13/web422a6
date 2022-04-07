import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { MusicDataService } from '../music-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases : any | undefined;
  releaseSub: Subscription | undefined;

  // To convert the date to desired format
  dateConvert(releaseDate: any) {
    let tempStr = "";
    if (releaseDate) {
      let tempArr = releaseDate.split("-");
      tempStr = tempArr[1] + "/" + tempArr[2] + "/" + tempArr[0];
    }

    return tempStr;
  }

  constructor(private ms : MusicDataService) { }

  ngOnInit(): void {
    this.releaseSub = this.ms.getNewReleases().subscribe(result => {
      this.releases = result.albums.items; 
    });
  }

  ngOnDestroy(): void {
    this.releaseSub?.unsubscribe();
  }

}
