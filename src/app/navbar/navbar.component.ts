import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter
} from '@angular/core';
  
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';

import { updateCurrentFolderContents } from '../app.actions';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export class FolderNode {
  children:       FolderNode[];
  foldername:     string;
  type:           any;
  kind:           string;
  id:             string;
  contents:       Array<Object>;
  parentFolderId: any;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  
  @select() mainFolder;
  
  nestedTreeControl: NestedTreeControl<FolderNode>;
  nestedDataSource: MatTreeNestedDataSource<FolderNode>;
  
  hasNestedChild = (_: number, nodeData: FolderNode) => !nodeData.type;

  private _getChildren = (node: FolderNode) => node.children;

  private _fileData: Object;
  
  
  private subscription: any;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.nestedTreeControl = new NestedTreeControl<FolderNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }
  
  ngOnInit() {
    this.subscription = this.mainFolder.subscribe( m => {
      const data = this.buildFileTree([m],0);
      this.nestedDataSource.data = data;
    })
  }
  
  buildFileTree(arr: Array<Object>, level: number): FolderNode[] {
    let result: FolderNode[] = [];

    for (let elem in arr ){
      const obj = arr[elem];
      if( obj.hasOwnProperty('kind') && obj['kind'] === 'Folder'){
        const node = new FolderNode();
        node.foldername = obj['name'];
        node.kind = obj['kind'];
        node.id = obj['_id'];
        node.parentFolderId = obj['parentFolderId'];
        
        if(obj['contents'] !== null){ 
          node.contents = obj['contents']
          node.children = this.buildFileTree(obj['contents'], level+1);
        }
        else {
          node.type = 'bottom'
        }
        
        result.push(node);
      }
    }
    
    return result;
  }
  
  handleFilenameClick(event, node){
    event.preventDefault();
    this.ngRedux.dispatch( updateCurrentFolderContents(node.contents) );
  }
  
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
