import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  searchMode: string = ''

  searchResult = new BehaviorSubject<any>(null);

  constructor() { }
}
