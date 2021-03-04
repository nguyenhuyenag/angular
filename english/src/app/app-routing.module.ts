import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VocabComponent } from './vocab/vocab.component';

const routes: Routes = [
    { path: 'vocab', component: VocabComponent },
    { path: '', redirectTo: 'vocab', pathMatch: 'full' },   // default
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
