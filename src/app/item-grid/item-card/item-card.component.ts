import {
  Component, 
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import axios from 'axios';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../app.store';
//import { ClickHandlerService } from '../../services/click-handler.service';

import { updateItemInfo, updateActiveFolderNodeById } from '../../app.actions';
import { FolderNode } from '../../models/folder-node.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  
  @Input() item: Object;
  @Input() kind: string;
  @Input() name: string;
  @Input() mimeType: string;
  @Input() id: string;
  

  @Output() iconClicked: EventEmitter<string> = new EventEmitter<string>();
  
  private isFile: Boolean = false;
  private isFolder: Boolean = false;
  private isImage: Boolean = false;
  private isText: Boolean = false;
  private isVideo: Boolean = false;
  
  private fileType: string = '';
  
  constructor(private ngRedux: NgRedux<IAppState>, private el: ElementRef) {
    
  }

  ngOnInit() {
    
    if(this.kind === 'Folder'){
      
      this.isFolder = true;
      
    } else {
      
      this.kind = 'File';
      
      this.fileType = (this.mimeType.split("/"))[0];
     
      switch( this.fileType ){
        
        case 'image':
          this.isImage = true;
          break;
          
        case 'text':
          this.isText = true;
          break;
          
        case 'video':
          this.isVideo = true;
          break;
        
        default:
          break;
          
      }
      this.isFile = true;
    }
  }
  
  updateItemInfo(event, item){
    this.ngRedux.dispatch( updateItemInfo(this.item) );
  }
  
  handleDoubleClick(event){
    event.preventDefault();
    const folderTree = this.ngRedux.getState()['folderTree'];
    this.ngRedux.dispatch( updateActiveFolderNodeById(this.id, folderTree) );
  }

}
