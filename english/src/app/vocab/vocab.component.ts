import { Component, OnInit, HostListener } from '@angular/core';
import { VocabService } from './vocab.service';
import { Vocab } from '../model/vocab';

export enum KEY_CODE {
    T = 84, P = 80, SPACE = 32,
    RIGHT_ARROW = 'ArrowRight'
}

@Component({
    selector: 'app-vocab',
    templateUrl: './vocab.component.html',
    styleUrls: ['./vocab.component.css']
})
export class VocabComponent implements OnInit {

    constructor(private service: VocabService) { }

    vocab: Vocab;

    pronoun: string;
    translate: string;
    word: string = "word";

    flag: boolean = true;
    show_pro: boolean = false;
    show_trans: boolean = false;

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        console.log(event.key, event.keyCode);
        if (event.key === KEY_CODE.RIGHT_ARROW) {
            this.randomVocab("1");
        }
        if (event.keyCode == KEY_CODE.P) {
            this.showPronoun();
        }
        if (event.keyCode == KEY_CODE.T) {
            this.showTranslate();
        }
        if (event.keyCode == KEY_CODE.SPACE) {
            this.showPronoun();
            this.showTranslate();
        }
    }

    ngOnInit(): void {
        this.randomVocab("0");
    }

    public reset() {
        this.show_pro = false;
        this.show_trans = false;
        this.pronoun = "Pronounce";
        this.translate = "Translate";
    }

    public randomVocab(flag: string) {
        this.reset();
        this.service.randomVocab(flag).subscribe(data => {
            this.vocab = data;
            this.handleChange();
        });
    }

    public showPronoun() {
        this.show_pro = !this.show_pro;
        this.pronoun = this.show_pro ? this.vocab.pronounce : "Pronounce";
    }

    public showTranslate() {
        this.show_trans = !this.show_trans;
        this.translate = this.show_trans ? this.vocab.translate : "Translate";
    }

    /**
     * flag: true   =>  eng
     *       false  =>  vie
     */
    public change() {
        this.flag = !this.flag;
        this.handleChange();
    }

    public handleChange() {
        if (!this.flag) {
            let tmp = this.vocab.word;
            this.vocab.word = this.vocab.translate;
            this.vocab.translate = tmp;
        }
        this.word = this.vocab.word;
    }

}
