import { Component, OnInit, HostListener } from '@angular/core';
import { VocabService } from './vocab.service';
import { Vocab } from '../model/vocab';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
}

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.css']
})
export class VocabComponent implements OnInit {

  constructor(private service: VocabService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.getVocab("1");
    }
  }

  pro: string;
  vocab: Vocab;
  word: string = "word";
  translate: string;

  ngOnInit(): void {
    this.getVocab("0");
  }

  init() {
    this.pro = "Pronounce";
    this.translate = "Translate";
  }

  getVocab(flag: string) {
    this.init();
    this.service.randomVocab(flag).subscribe(data => {
      this.vocab = data;
      this.word = this.vocab.word;
    });
  }

  showPro() {
    this.pro = this.vocab.pronounce;
  }

  showMean() {
    this.translate = this.vocab.translate;
  }

}
