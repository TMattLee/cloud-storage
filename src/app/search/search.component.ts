import { Component, OnInit } from '@angular/core';


import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';
import { 
  toggleMatchCase,
  updateSearchString
} from '../app.actions';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class SearchErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  @select() shouldMatchCase;
  @select() searchString;
  
  searchFormControl = new FormControl('', [
    Validators.pattern('[a-zA-Z0-9-_ .]*')
  ]);
  
  matcher = new SearchErrorStateMatcher();

  
  private maxLength: number = 20;
  private isBadInput: Boolean = true;


  constructor(private ngRedux: NgRedux<IAppState>) {
  }
  
  handleSliderToggle(){
    this.ngRedux.dispatch( toggleMatchCase() );
  }
  
  handleSearchChange(event){
    let str = event.target.value;
    let matched = str.match(/[a-zA-Z0-9-_ .]*/gi);
    if( str === ''){
      this.ngRedux.dispatch( updateSearchString( str ) );
    }
    else if( str &&  matched){
      console.log(matched)
      str = matched[0]
      this.ngRedux.dispatch( updateSearchString( str ) );
    } 
    
  }
  
  ngOnInit() {
  }

}
