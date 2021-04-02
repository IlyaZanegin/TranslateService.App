import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@services';

@Component({
  selector: 'app-list-translate',
  templateUrl: './list-translate.component.html',
  styleUrls: ['./list-translate.component.scss']
})
export class ListTranslateComponent implements OnInit {
  constructor(
    private readonly translateService: TranslateService) { }

  ngOnInit(): void {
    
    this.translateService.getLanguageList().subscribe(
      response => {
      },
      error => {
      });
  }
}
