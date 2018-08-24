import { 
  Component, 
  OnInit,
  OnChanges, 
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';
import { setIsLoadingToFalse } from '../app.actions';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})

export class ItemGridComponent implements OnInit, OnChanges {
  
  @select() isLoading;
 
  @Input()  folderContents : Object;
  @Input()  matchCase: Boolean;
  @Input()  searchString: string;
  @Output() sendFileInfoToAppComponentEvent: EventEmitter<Object> = new EventEmitter();
  
  private data: Array<Object> = null;
  private files: Array<Object>;
  private folders: Array<Object>;
  private isEmpty: Boolean = false;
  private noResultsIndicator: Boolean = false;
  
  private progressSpinnerMode: string = 'indeterminate';
  private progressSpinnerColor: string = 'primary';
  
  private stringFilter: string = '';

  constructor(private ngRedux: NgRedux<IAppState>) { 
    this.files = [];
    this.folders = [];
  }

  ngOnInit() {
  }
  
  sendFileInfoToAppComponent(event){
    this.sendFileInfoToAppComponentEvent.emit(event)
  }
  
  populateGrid(){
    this.noResultsIndicator = true;
    console.log(this.data,this.stringFilter,this.matchCase)
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
    console.log(this.isLoading);
  }
  
  handleFolderContentChanges(folderContentChanges){
    const changedData = folderContentChanges;

    if(!changedData.currentValue) {
      this.isEmpty = true;
      return;
    } else {
      this.isEmpty = false;
    }
    
    this.data = changedData.currentValue;    
    this.populateGrid();
  }
  
  handleSearchStringChanges(searchStringChanges){
    console.log('Search string from item-grid is: ', this.searchString)

    if( searchStringChanges) this.stringFilter = searchStringChanges.currentValue;
    
    this.populateGrid();
  }
  
  handleMatchCaseChange(matchCaseChange){
    this.matchCase = matchCaseChange.currentValue
    this.populateGrid();
  }
  
  
  
  ngOnChanges(changes: SimpleChanges){
    
    this.folders = [];
    this.files = [];
    
    if (changes.folderContents) this.handleFolderContentChanges(changes.folderContents);
    
    if (changes.matchCase) this.handleMatchCaseChange(changes.matchCase);
    
    if (changes.searchString) this.handleSearchStringChanges(changes.searchString);
    
  }
}
