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

  changeStoryName(name, tree, selected_node) {
    function changeNameRoop(root_ary) { root_ary.forEach(root_node => {
      if (root_node._id === selected_node._id) {
        root_node['name'] = name;
        return true;
      } else if (root_node['children']) {
        changeNameRoop(root_node['children']);
      } else if (root_node === root_ary[root_ary.length - 1] ) {
        return false;
      }
     });
    }
    changeNameRoop(tree.treeModel.nodes);
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
    tree.treeModel.update();
  }

  deleteStory(tree, selected_node) {
    function deleteStoryRoop(root_ary, parent_node) { root_ary.forEach(root_node => {
      let parent_ary;
      if (parent_node.children) {
        parent_ary = parent_node.children;
      } else {
        parent_ary = parent_node;
      }
      if (root_node._id === selected_node._id) {
        for (let i = 0; i < parent_ary.length; i++) {
          if (parent_ary[i]._id === selected_node._id) {
            parent_ary = parent_ary.splice(i, 1);
            if (parent_ary.length === 1) {
              parent_ary = null;
              return true;
            }
            return true;
          }
        }
        return true;
      } else if (root_node['children']) {
        deleteStoryRoop(root_node['children'], root_node);
      } else if (root_node === root_ary[root_ary.length - 1] ) {
        return false;
      }
     });
    }
    deleteStoryRoop(tree.treeModel.nodes, tree.treeModel.nodes);
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
    tree.treeModel.update();
  }

  updateTree(tree) {
    console.log(tree.treeModel.nodes);
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
    tree.treeModel.update();
  }
}
