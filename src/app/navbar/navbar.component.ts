import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { MatButtonToggle } from '@angular/material/button-toggle';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs/internal/Subscription';
  
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';
import { updateActiveFolderByNode,updateFolderTree } from '../app.actions';
import { FolderNode } from '../models/folder-node.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  
  @select() mainFolder;
  
  @select() activeFolderNode;
  
  @Output() test = new EventEmitter<any>();
  
  @ViewChildren(MatButtonToggle) toggleButtons: QueryList<MatButtonToggle>;
  
  topNode: FolderNode;
  
  folderTree: FolderNode;
  
  nestedTreeControl: NestedTreeControl<FolderNode>;
  nestedDataSource: MatTreeNestedDataSource<FolderNode>;
  
  hasNestedChild = (_: number, nodeData: FolderNode) => !nodeData.isBottomFolder;

  private _getChildren = (node: FolderNode) => node.children;

  private _fileData: Object;
  
  private mainFolderSubscription: Subscription;
  private activeFolderNodeSubscription: Subscription;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.nestedTreeControl = new NestedTreeControl<FolderNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }
  
  ngOnInit() {
    this.mainFolderSubscription = this.mainFolder.subscribe( m => {
      this.folderTree = this.buildFileTree([m],0)[0];
      this.nestedDataSource.data = [this.folderTree];
      this.ngRedux.dispatch( updateFolderTree( this.folderTree ));
      this.nestedTreeControl.expand(this.folderTree);
    });
    
    this.activeFolderNodeSubscription = this.activeFolderNode.subscribe(
      (folderNode: FolderNode) => {
        this.nestedTreeControl.expand(folderNode);
        if( this.toggleButtons ) {
          this.toggleButtons.forEach(
            button => {
              if(button.value === folderNode.foldername) {
                button.checked = true;
              } else {
                button.checked = false;
              }
          });
        }
    });
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
        node.mimeType = obj['mimeType'];
        
        if(obj['contents'] !== null){ 
          node.contents = obj['contents']
          node.children = this.buildFileTree(obj['contents'], level+1);
          node.isBottomFolder = false;
        }
        else {
          node.isBottomFolder = true;
        }
        
        result.push(node);
      }
    }
    return result;
  }
  
  handleFilenameClick(event, node){
    event.preventDefault();
    this.ngRedux.dispatch( updateActiveFolderByNode(node) );
  }
  
  ngOnDestroy(){
    this.mainFolderSubscription.unsubscribe();
  }
  
}
