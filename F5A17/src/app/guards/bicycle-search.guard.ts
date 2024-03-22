import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NewBicycleComponent } from '../components/new-bicycle/new-bicycle.component';

@Injectable({
  providedIn: 'root'
})
export class BicycleSearchGuard implements CanActivate {
  canActivate(): boolean {
    return NewBicycleComponent.behaviorSubject.getValue();
  }
}
