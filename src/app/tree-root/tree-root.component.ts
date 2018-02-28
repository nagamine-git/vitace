import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // 追加
import { Observable } from 'rxjs/Observable'; // 追加

@Component({
  selector: 'app-tree-root',
  templateUrl: './tree-root.component.html'
})
export class TreeRootComponent implements OnInit {

  storiesRef: AngularFireList<{}>;
  stories: Observable<any[]>;

  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];

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

}
