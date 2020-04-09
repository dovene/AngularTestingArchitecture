import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HeroService } from "../hero/hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" }
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe("heroComponent (deep test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService = jasmine.createSpyObj([
    "getHeroes",
    "addHero",
    "deleteHero"
  ]);
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "Spider", strength: 8 },
      { id: 2, name: "Man", strength: 2 },
      { id: 3, name: "New", strength: 5 }
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ]
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render a HeroComponent for each hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponent.length).toEqual(3);
    //expect(heroComponent[0].componentInstance.hero.name).toEqual('Spider');

    for (let i = 0; i < HEROES.length; i++) {
      expect(heroComponent[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it("sould call del service on delete button click", () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    //working same as next uncommented line
    //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    //working same as next uncommented line
    //heroComponents[0].triggerEventHandler('delete',null);

    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it("sould add a new hero to the list on add btn click", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit
    fixture.detectChanges();
    const name = "Thomas Sankara";
    mockHeroService.addHero.and.returnValue(
      of({ id: 6, name: name, strength: 7 })
    );
    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css("button"))[0];

    inputElement.value = name;
    addButton.triggerEventHandler("click", null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;
    expect(heroText).toContain(name);
  });

  it("sould have the correct route for the first hereo click", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);
    expect(routerLink.navigatedTo).toBe("/detail/1");
  });
});
