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
    
    flag:boolean = true;

    ngOnInit(): void {
        this.getVocab("0");
    }

    init() {
        this.pro = "Pronounce";
        this.translate = "Translate";
    }

    public getVocab(flag: string) {
        this.init();
        this.service.randomVocab(flag).subscribe(data => {
            this.vocab = data;
            this.handleChange();
        });
    }

    public showPro() {
        this.pro = this.vocab.pronounce;
    }

    public showMean() {
        this.translate = this.vocab.translate;
    }

    public handleChange() {
        if (!this.flag) {
            let tmp = this.vocab.word;
            this.vocab.word = this.vocab.translate;
            this.vocab.translate = tmp;
        }
        this.word = this.vocab.word;
    }

    public change() {
        this.flag = !this.flag;
        this.handleChange();
    }

}
