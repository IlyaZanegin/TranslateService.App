export interface ITranslate {
  sourceLanguageCode: string;
  targetLanguageCode: string;
  format: string;
  texts: string[];
  folderId: string;
  model: string;
  glossaryConfig: {
    glossaryData: IGlossaryData
  }
}

export interface IGlossaryData {
  glossaryPairs: IGlossaryPair[];
}

export interface IGlossaryPair {
  sourceText: string;
  translatedText: string;
}
