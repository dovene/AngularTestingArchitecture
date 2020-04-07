import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroService } from "../hero/hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";

describe('heroComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div> </div>',
      })
     class FakeHeroComponent {
        @Input() hero: Hero;
      }





    beforeEach(() => {
        HEROES = [
            {id:1, name:'Spider', strength: 8},
            {id:2, name:'Man', strength: 2},
            {id:3, name:'New', strength: 5},
        ]
        TestBed.configureTestingModule({
            declarations:[HeroesComponent,
            FakeHeroComponent,
        ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ],
            //schemas: [NO_ERRORS_SCHEMA],

        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should return the heroes list from the service', () => {
       mockHeroService.getHeroes.and.returnValue(of(HEROES)); 
       fixture.detectChanges();

       expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each heroe', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES)); 
        fixture.detectChanges();
 
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
     });
 
    
})