import { Component, OnInit } from '@angular/core';
import { VocabService } from './vocab.service';
import { Vocab } from '../model/vocab';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.css']
})
export class VocabComponent implements OnInit {

  constructor(private service: VocabService) { }

  pro: string;
  vocab: Vocab;
  word: string = "word";
  translate: string;

  ngOnInit(): void {
    this.getVocab("0");
  }

  public init() {
    this.pro = "Pronounce";
    this.translate = "Translate";
  }

  public getVocab(flag: string) {
    this.init();
    this.service.randomVocab(flag).subscribe(data => {
      this.vocab = data;
      this.word = this.vocab.word;
    });
  }

  public showPro() {
    this.pro = this.vocab.pronounce;
  }

  public showMean() {
    this.translate = this.vocab.translate;
  }

}
