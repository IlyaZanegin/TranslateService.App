import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@services';
import { ILanguage } from '@models';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-translate',
  templateUrl: './add-translate.component.html',
  styleUrls: ['./add-translate.component.scss']
})
export class AddTranslateComponent implements OnInit {
  form: FormGroup;
  languages: ILanguage[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      sourceLangs: [''],
      targetLangs: [''],
      sorceText: '',
      targetText: ''
    });
  }

  ngOnInit(): void {
    this.translateService.getLanguageList().subscribe(
      response => {
        this.languages = response;
      },
      error => {
        
      });
  }

  translate() {
   
  }

  save() {
 
  }
}
