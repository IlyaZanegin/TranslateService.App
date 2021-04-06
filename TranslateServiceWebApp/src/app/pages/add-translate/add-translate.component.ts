import { Component, OnInit } from '@angular/core';
import { TranslateService, StorageBrowserService, NotificationService } from '@services';
import { ILanguage, ITranslateResponse, IElementStorage } from '@models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-add-translate',
  templateUrl: './add-translate.component.html',
  styleUrls: ['./add-translate.component.scss']
})
export class AddTranslateComponent implements OnInit {
  form: FormGroup;
  languages: ILanguage[] = [];
  private readonly sourceLangs = 'sourceLangs';
  private readonly targetLangs = 'targetLangs';
  private readonly sorceText = 'sorceText';
  private readonly targetText = 'targetText';

  constructor(
    private readonly translateService: TranslateService,
    private readonly storageBrowserService: StorageBrowserService,
    private readonly notificationService: NotificationService,
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
        this.notificationService.error(error.message);
      });
  }

  translate() {
    const sourceLang = this.languages.find(x => x.code == this.getSourceLangValue());
    const targetLang = this.languages.find(x => x.code == this.getTargetLangValue());

    this.translateService.translate(sourceLang, targetLang, this.getSourceText()).subscribe(
      response => {
        this.setTargetText(response);
        this.notificationService.success('Text was translated');
      },
      error => {
        this.notificationService.error(error.message);
      });
  }

  save() {
    const elementStorage: IElementStorage = {
      id: Guid.create().toString(),
      recordDate: new Date(),
      sourceCode: this.getSourceLangValue(),
      sourceText: this.getSourceText(),
      targetCode: this.getTargetLangValue(),
      targetText: this.getTargetText()
    };

    this.storageBrowserService.create(elementStorage);

    this.notificationService.success('Added new translate in localStorage');
  }

  canTranslate(): boolean {
    return this.getSourceLangValue().length > 0 && this.getTargetLangValue().length > 0 && this.getSourceText().length > 0;
  }

  canSave(): boolean {
    return this.getSourceLangValue().length > 0 && this.getTargetLangValue().length > 0 && this.getSourceText().length > 0 && this.getTargetText().length > 0;
  }

  private getSourceLangValue(): string {
    return this.form.controls[this.sourceLangs].value;
  }

  private getTargetLangValue(): string {
    return this.form.controls[this.targetLangs].value;
  }

  private getSourceText(): string {
    return this.form.controls[this.sorceText].value;
  }

  private getTargetText(): string {
    return this.form.controls[this.targetText].value;
  }

  private setTargetText(targetText: ITranslateResponse[]): void {
    let result = '';

    targetText.forEach(phrase => {
      result += phrase.text + '\n';
    });

    this.form.controls[this.targetText].setValue(result.slice(0, -1));
  }
}
