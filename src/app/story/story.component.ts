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

  // save(tree) {
  //   console.log(Object.keys(tree.treeModel.nodes));
  //   this.storiesRef.push({'name': this.name})
  //   .then(() => this.name = '');
  // }

  save(tree) {
    tree.treeModel.nodes.push({name: this.name});
    tree.treeModel.update();
    this.storiesBoard.set( 'stories', tree.treeModel.nodes)
    .then(() => this.name = '');
  }

  changeValue(name) {
    this.name = name;
  }

  // 未完成
  update(name) {
    this.storiesRef.update( 'L6fJOmWwvBG93-PXn29', {'name': name});
    this.stories.subscribe((res: Response) => {
      console.log(res);
    });
  }
  updateTree(tree) {
    console.log(tree.treeModel.nodes);
    this.storiesBoard.set( 'stories', tree.treeModel.nodes);
  }
}
