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

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../app.store';
import { updateItemInfo } from '../../app.actions';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  
  @Input() item: Object;
  
  @Input() kind: String;
  @Input() name: String;
  @Input() mimeType: String;
  @Input() id: String;
  
  private isFile: Boolean = false;
  private isFolder: Boolean = false;

  constructor(private ngRedux: NgRedux<IAppState>,private el: ElementRef) {
    
  }

  ngOnInit() {
    if(this.kind === 'Folder'){
      this.isFolder = true;
    } else {
      this.isFile = true;
    }
  }
  
  updateItemInfo(event, item){
    this.ngRedux.dispatch( updateItemInfo(this.item) );
  }

}
