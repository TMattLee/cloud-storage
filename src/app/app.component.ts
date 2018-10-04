import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './app.store';
import { 
	updateMainFolder,
	updateCurrentFolderContents
} from './app.actions';

import * as dataFile from './dummydata.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	@select() mainFolder;
	
  title = 'cloud-storage';
  
	folderContents = null;

	
  private itemInfo: Object;
  private searchString: string = '';
  private matchCase: Boolean = false;
  private mainFolderSubscription: any;
  
  constructor(private ngRedux: NgRedux<IAppState>) { } 
  
  ngOnInit(){
    this.mainFolderSubscription = this.mainFolder.subscribe(
      (mainFolder) => {
        
      }  
    )
    
    const data = dataFile;
    const mainFolder = data.mainFolder;
    const folderContents = mainFolder.contents
    this.ngRedux.dispatch( updateMainFolder(mainFolder) );
    this.ngRedux.dispatch( updateCurrentFolderContents( folderContents ) );
  }
  
  ngAfterViewInit(){
    /*axios({
      method: 'GET',
      url:'api/getUser?username=Dummy%20User',
    })
    .then( response => {
      this.folderContents = response.data.mainFolder.contents;
      const mainFolder = response.data.mainFolder;
      this.ngRedux.dispatch( updateMainFolder(mainFolder) );
      this.ngRedux.dispatch( updateCurrentFolderContents( this.folderContents ) );
    })
    .catch( error => console.log( error ));*/
    
  }
  
  updateFileItem(event){
  	this.itemInfo = event
  }
  
  applySearchParams(event){
  	console.log(event)
  	const { searchString, matchCase } = event;
  	this.searchString = searchString;
  	this.matchCase = matchCase;
  }
  
  getFolderContents(event){
  	console.log('contents', event)
  	if(event) {
  		this.folderContents = event;
  	} else {
  		this.folderContents = null;
  	}
  }
  

}
