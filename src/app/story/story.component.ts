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

  storiesBoard: AngularFireList<{}>;
  storiesRef: AngularFireList<{}>;
  stories: Observable<{}>;
  tree: TreeComponent;
  new_story_name: String = '';
  options: ITreeOptions = {
    allowDrag: (node) => {
      return true;
    },
    // animateExpand: true,
    nodeClass: (node) => {
      return 'card';
    },
    idField: '_id',
  };

  constructor(db: AngularFireDatabase) {
    this.storiesBoard = db.list('/boards/0');
    this.storiesRef = db.list('/boards/0/stories');
    this.stories = this.storiesRef.valueChanges();
  }

  ngOnInit() {
  }

  checkStatusDoing(res) {
    if (res === 1) {
      return true;
    }
    return false;
  }
  checkStatusDone(res) {
    if (res === 2) {
      return true;
    }
    return false;
  }
  changeStatus(tree, selected_story) {
    console.log(selected_story.data.status);
    if (selected_story.data.status === 0) {
      // ステータス変更処理
    }
    if (selected_story.data.status === 1) {
      // ステータス変更処理
    }
    if (selected_story.data.status === 2) {
      // ステータス変更処理;
    }
    // ステータス変更反映処理
  }

  saveNewStory(tree) {
    tree.treeModel.nodes.push({name: this.new_story_name});
    this.storiesBoard.set( 'stories', tree.treeModel.nodes)
    .then(() => tree.treeModel.update());
    this.new_story_name = '';
  }

  changeNewName(name) {
    this.new_story_name = name;
  }

  changeStoryName(name, tree, selected_node, current_node) {
    let end_roop = false;
    function changeStoryNameRoop(root_ary): Promise<any> {
      return new Promise((resolve, reject) => {
        for (let i = 0; i < root_ary.length && end_roop === false; i++) {
          if (root_ary[i]._id === selected_node._id) {
            root_ary[i]['name'] = name;
            resolve();
            end_roop = true;
          } else if (root_ary[i]['children']) {
            changeStoryNameRoop(root_ary[i]['children']);
          } else if (root_ary[i] === root_ary[root_ary.length - 1] ) {
            return false;
          }
        }
      });
    }
    changeStoryNameRoop(tree.treeModel.nodes)
    .then(() => this.storiesBoard.set( 'stories', tree.treeModel.nodes));
  }

  deleteStory(tree, selected_node) {
    function deleteStoryRoop(root_ary, parent_node): Promise<any> {
      return new Promise((resolve, reject) => {
        root_ary.forEach(root_node => {
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
                resolve();
              }
            }
          }
          return true;
        } else if (root_node['children']) {
          deleteStoryRoop(root_node['children'], root_node);
        } else if (root_node === root_ary[root_ary.length - 1] ) {
          return false;
        }
      });
     });
    }
    deleteStoryRoop(tree.treeModel.nodes, tree.treeModel.nodes)
    .then(() => this.storiesBoard.set('stories', tree.treeModel.nodes));
  }

  chengeStoryStatus(tree, selected_node) {
    function deleteStoryRoop(root_ary, parent_node): Promise<any> {
      return new Promise((resolve, reject) => {
        root_ary.forEach(root_node => {
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
                resolve();
              }
            }
          }
          return true;
        } else if (root_node['children']) {
          deleteStoryRoop(root_node['children'], root_node);
        } else if (root_node === root_ary[root_ary.length - 1] ) {
          return false;
        }
      });
     });
    }
    deleteStoryRoop(tree.treeModel.nodes, tree.treeModel.nodes)
    .then(() => this.storiesBoard.set('stories', tree.treeModel.nodes));
  }

  updateTree(tree) {
    this.storiesBoard.set( 'stories', tree.treeModel.nodes)
    .then(() => tree.treeModel.update());
  }

  expandAll (tree) {
    tree.treeModel.expandAll();
  }

  collapseAll (tree) {
    tree.treeModel.collapseAll();
  }
}
