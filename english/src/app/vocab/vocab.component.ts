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
  word: string;
  mean: string;
  vocab: Vocab;

  ngOnInit(): void {
    this.getVocab("0");
  }

  public init() {
    this.mean = "Mean";
    this.pro = "Pronounce";
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
    this.mean = this.vocab.mean;
  }

}
