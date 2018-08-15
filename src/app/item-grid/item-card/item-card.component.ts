import {
  Component, 
  ElementRef,
  OnInit,
  Input,
  Output,
  OnChanges, 
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import axios from 'axios';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit, OnChanges {
  
  @Input() kind: String;
  @Input() name: String;
  @Input() mimeType: String;
  @Input() id: String;
  
  @Output()
  sendFileInfoToItemGridEvent: EventEmitter<Object> = new EventEmitter();
  
  private isFile: Boolean = false;
  private isFolder: Boolean = false;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    
    const kind = changes.kind.currentValue
    console.log('card',changes.kind.currentValue)
    if(this.kind === 'Folder'){
      this.isFolder = true;
    } else {
      this.isFile = true;
    }
    console.log(this.kind)
  }
  
  handleCardClick(event){
    event.preventDefault();
    this.getFileInfo();
  }
  
  getFileInfo(){
    axios({
      method: 'GET',
      url:'api/getItemInfo',
      params:{
        id:   this.id,
        kind: this.kind,
      }
    })
    .then( response => {
      
      const { data } = response
      console.log('got file data...', data)
      this.sendFileInfoToItemGrid(data)
    })
    .catch( error => console.log( error ) )
  }
  
  sendFileInfoToItemGrid(event){
    this.sendFileInfoToItemGridEvent.emit(event)
  }

}
