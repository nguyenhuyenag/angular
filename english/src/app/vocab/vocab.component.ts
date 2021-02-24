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

  public vocab: Vocab;

  word: any;

  ngOnInit(): void {
    this.get();
  }

  public get() {
    this.service.randomVocab().subscribe(data => {
      this.vocab = data;
      this.word = this.vocab.word.toUpperCase();
      // console.log(this.vocab.id);
    }, error => {
      // console.log(error);
    });
  }

}
