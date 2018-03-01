import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // 追加
import { Observable } from 'rxjs/Observable'; // 追加

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit {

  storiesRef: AngularFireList<{}>;
  stories: Observable<any[]>;
  options: ITreeOptions = {
    allowDrag: (node) => {
      return true;
    },
    animateExpand: true,
    nodeClass: (node) => {
      return 'card';
    },
    useCheckbox: true
  };

  constructor(db: AngularFireDatabase) {
    this.storiesRef = db.list('/boards/0/stories');
    this.stories = this.storiesRef.valueChanges();
  }

  ngOnInit() {
  }

  save() {
    this.storiesRef.push({'name': 'hogehoge'});
  }
}