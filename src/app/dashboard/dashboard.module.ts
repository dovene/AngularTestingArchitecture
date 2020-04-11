import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, SharedModule],
    exports: [ DashboardComponent, HeroSearchComponent, HeroDetailComponent ],
    declarations: [ DashboardComponent, HeroSearchComponent, HeroDetailComponent ],
    providers: [ ]
})
export class DashboardModule {

}
