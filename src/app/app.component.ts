import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloud-storage';
  
	folderContents = null;
	
	mainFolder= null;
  
  private itemInfo: Object;
  
  ngAfterViewInit(){
    console.log('initializing...');
    axios({
      method: 'GET',
      url:'api/getUser?username=Dummy%20User',
    })
    .then( response => {
      console.log(response.data.mainFolder)
      this.folderContents = response.data.mainFolder.contents;
      this.mainFolder = response.data.mainFolder;
      
    })
    .catch( error => console.log( error ));
  }
  
  updateFileItem(event){
  	this.itemInfo = event
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
