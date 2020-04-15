import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  flush
} from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { By } from '@angular/platform-browser';
import { HeroService } from '../hero/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('heroComponent (deep test)', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLoaction;
  let HEROES;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLoaction = jasmine.createSpyObj(['back']);
    HEROES = [
      { id: 1, name: 'Spider', strength: 8 },
      { id: 2, name: 'Man', strength: 2 },
      { id: 3, name: 'New', strength: 5 }
    ];
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: Location,
          useValue: mockLoaction
        }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 1, name: 'Dov Dov', strength: 123 })
    );
  });

  it('should render hero name in tag h2', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'DOV DOV'
    );
  });

  it('should call update Hero when Async func save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.saveUsingPromiseJustForTestingPurpose();
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
