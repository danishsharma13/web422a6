import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  results : any;
  resultSub : Subscription | undefined;
  sub : Subscription | undefined;
  searchQuery : String = "";



  constructor(private ms: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || ""; 

      this.resultSub = this.ms.searchArtists(this.searchQuery).subscribe(data => {
        this.results = data.artists.items.filter(item => item.images.length > 0);
      });
    })
  }

  ngOnDestroy(): void {
    this.resultSub?.unsubscribe();
    this.sub?.unsubscribe();
  }
}
