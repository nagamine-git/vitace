import { Component, OnInit } from '@angular/core';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // 追加
import { Observable } from 'rxjs/Observable'; // 追加
import { Story } from './story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit {

  tree: TreeComponent;
  name: String = '';
  storiesBoard: AngularFireList<{}>;
  storiesRef: AngularFireList<{}>;
  stories: Observable<{}>;
  options: ITreeOptions = {
    allowDrag: (node) => {
      return true;
    },
    animateExpand: true,
    nodeClass: (node) => {
      return 'card';
    },
    useCheckbox: true,
    idField: '_id',
  };

  constructor(db: AngularFireDatabase) {
    this.storiesBoard = db.list('/boards/0');
    this.storiesRef = db.list('/boards/0/stories');
    this.stories = this.storiesRef.valueChanges();
  }

  ngOnInit() {
  }

  save(tree) {
    tree.treeModel.nodes.push({name: this.name});
    tree.treeModel.update();
    this.storiesBoard.set( 'stories', tree.treeModel.nodes)
    .then(() => this.name = '');
  }

  changeValue(name) {
    this.name = name;
  }

  changeStoryName(name, tree, $event) {
    function changeNameRoop(children_ary) { children_ary.forEach(child_node => {
      if (child_node._id === tree.treeModel.focusedNodeId) {
        child_node['name'] = name;
        return true;
      } else if (child_node['children']) {
        changeNameRoop(child_node['children']);
      } else if (child_node === children_ary[children_ary.lenght - 1] ) {
        return false;
      }
     });
    }
    changeNameRoop(tree.treeModel.nodes);
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
  }

  updateTree(tree) {
    console.log(tree.treeModel.nodes);
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
  }
}
