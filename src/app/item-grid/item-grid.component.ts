import { 
  Component, 
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';
import { 
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../app.actions';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})

export class ItemGridComponent implements OnInit {
  
  @select() isLoading;
  @select() shouldMatchCase;
  @select() searchString;
  @select() currentFolderContents;
 

  private data: Array<any> = null;
  private files: Array<Object>;
  private folders: Array<Object>;
  private matchCase: Boolean;
  private stringFilter: string;
  private isEmpty: Boolean = false;
  private noResultsIndicator: Boolean = false;
  
  private progressSpinnerMode: string = 'indeterminate';
  private progressSpinnerColor: string = 'primary';

  constructor(private ngRedux: NgRedux<IAppState>) { 
    this.files = [];
    this.folders = [];
  }

  ngOnInit() {
    this.ngRedux.select(state => state.shouldMatchCase )
      .subscribe( shouldMatchCase => {
        this.ngRedux.dispatch( setIsLoadingToTrue() );
        this.matchCase = shouldMatchCase;
        this.populateGrid();
      });
      
    this.ngRedux.select( state => state.searchString )
      .subscribe( searchString => {
        this.ngRedux.dispatch( setIsLoadingToTrue() );
        this.stringFilter = searchString
        this.populateGrid();
      });
      
    this.ngRedux.select( state => state.currentFolderContents )
      .subscribe( currentFolderContents => {
        this.ngRedux.dispatch( setIsLoadingToTrue() );
        this.isEmpty = true;
        this.data = currentFolderContents;
        if( this.data ) this.isEmpty = false;
        this.populateGrid();
      });
      
  }
  
  populateGrid(){
    this.files = [];
    this.folders = [];
    this.noResultsIndicator = true;
    const data: Array<any> = this.data;
    
    if( data ){
      data.forEach( obj => {
        let name = obj.name;
        let filter = this.stringFilter;
        
        if(!this.matchCase) {
          name = name.toLowerCase();
          filter = filter.toLowerCase();
        }
        
        if( name.match(filter) ){
          if( obj.kind === 'Folder') this.folders.push(obj);
          if( obj.kind === 'File') this.files.push(obj); 
        }
        
      });
    }
    
    if(this.folders.length > 0 || this.files.length > 0 ) this.noResultsIndicator = false;
    
    this.ngRedux.dispatch( setIsLoadingToFalse() );
  }
  

  
}
