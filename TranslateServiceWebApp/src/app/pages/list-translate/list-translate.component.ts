import { Component, OnInit } from '@angular/core';
import { StorageBrowserService } from '@services';
import { IElementStorage } from '@models';

@Component({
  selector: 'app-list-translate',
  templateUrl: './list-translate.component.html',
  styleUrls: ['./list-translate.component.scss']
})
export class ListTranslateComponent implements OnInit {
  elements: IElementStorage[] = [];

  constructor(
    private readonly storageBrowserService: StorageBrowserService) {

  }

  ngOnInit(): void {
    this.elements = this.storageBrowserService.getAll();
  }
}
