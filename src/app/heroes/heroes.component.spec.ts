import {HeroesComponent} from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name:'Spider', strength: 8},
            {id:2, name:'Man', strength: 2},
            {id:3, name:'New', strength: 5},
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        component = new HeroesComponent(mockHeroService); 
    })


    describe('delete',() => {
        it('should remove the indicated heroe', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2)
        })

        it('should call the delete heroe service', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })

    })

})

