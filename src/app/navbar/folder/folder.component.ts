import { 
  Component, 
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FolderNode } from '../../models/folder-node.model';

import { Subscription } from 'rxjs';


import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../app.store';
import { updateCurrentFolderContents } from '../../app.actions';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  
  @Input() node: FolderNode;
  @Input() treeControl;
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    
  }
  
}
