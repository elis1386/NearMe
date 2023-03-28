import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item from favorites array', () => {
    component.favorites = [
      {
        img: 'test image',
        title: 'Title 1',
        description: 'Description about place here',
        address: 'Address 1',
      },
      {
        img: 'test image',
        title: 'Title 2',
        description: 'Description about place here',
        address: 'Address 2',
      },
    ];
    expect(component.favorites.length)
      .withContext('length should be 2')
      .toBe(2);
    component.removeFavorite(component.favorites[0].title); // remove first object
    fixture.detectChanges();
    expect(component.favorites.length)
      .withContext('length should be 1')
      .toBe(1);
    expect(component.favorites[0].title).toBe('Title 2');
  });

  it('should display ng-template if no favorites', () => {
    component.favorites = [];
    fixture.detectChanges();
    let divEl: HTMLElement =
      fixture.nativeElement.querySelector('.no-favorites');

    expect(divEl.textContent).toBe('No favorites found');
  });
});
