import { Component, OnInit } from '@angular/core';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
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
    this.storiesBoard.set( 'stories', tree.treeModel.nodes)
    .then(() => tree.treeModel.update())
    .then(() => this.name = '');
  }

  changeValue(name) {
    this.name = name;
  }

  changeStoryName(name, tree, selected_node, current_node) {
    let end_roop = false;
    function changeNameRoop(root_ary) {
      return new Promise(function(resolve, reject) {
          for (let i = 0; i < root_ary.length && end_roop === false; i++) {
            if (root_ary[i]._id === selected_node._id) {
              root_ary[i]['name'] = name;
              end_roop = true;
            } else if (root_ary[i]['children']) {
              changeNameRoop(root_ary[i]['children']);
            } else if (root_ary[i] === root_ary[root_ary.length - 1] ) {
              return false;
            }
          }
          resolve(root_ary);
      });
  }
    changeNameRoop(tree.treeModel.nodes)
    .then((return_tree) => this.storiesBoard.set( 'stories', return_tree))
    .then(() => tree.treeModel.update());
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
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
    tree.treeModel.update();
  }

  checkKey ($event) {
    console.log($event);
  }

  expandAll (tree) {
    tree.treeModel.expandAll();
  }

  collapseAll (tree) {
    tree.treeModel.collapseAll();
  }
}
