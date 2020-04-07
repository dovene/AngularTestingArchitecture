import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('heroComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id:1, name:'Dov', strength:3};
       
        expect(fixture.componentInstance.hero.name).toEqual('Dov')
    });

    it('should render the correct hero using nativeElement', () => {
        fixture.componentInstance.hero = {id:1, name:'Dov', strength:3};
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Dov')
     });

    it('should render the correct hero using debugElement', () => {
        fixture.componentInstance.hero = {id:1, name:'Dov', strength:3};
        fixture.detectChanges();

        let debugAnchor = fixture.debugElement.query(By.css('a'));
        expect(debugAnchor.nativeElement.textContent).toContain('Dov')
    });
})