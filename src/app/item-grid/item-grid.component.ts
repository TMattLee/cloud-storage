import { 
  Component, 
  OnInit,
  OnChanges, 
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})

export class ItemGridComponent implements OnInit, OnChanges {
  
 
  @Input() folderContents : Object;
  @Output() sendFileInfoToAppComponentEvent: EventEmitter<Object> = new EventEmitter();
  
  private data: Array<Object> = null;
  private files: Array<Object>;
  private folders: Array<Object>;
  private isEmpty: Boolean = false;

  constructor() { 
    this.files = [];
    this.folders = [];
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    
    this.folders = [];
    this.files = [];
    const changedData = changes.folderContents;
    console.log(changedData);
    
    if(!changedData.currentValue) {
      this.isEmpty = true;
      return;
    } else {
      this.isEmpty = false;
    }
    
    this.data = changedData.currentValue;
    
    const data: Array<any> = this.data;
    
    if( data ){
      data.forEach( obj => {
        if( obj.kind === 'Folder') this.folders.push(obj);
        if( obj.kind === 'File') this.files.push(obj); 
      })
    }
    
  }
  
  sendFileInfoToAppComponent(event){
    this.sendFileInfoToAppComponentEvent.emit(event)
  }
}
