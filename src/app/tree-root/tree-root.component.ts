import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-tree-root',
  templateUrl: './tree-root.component.html'
})
export class TreeRootComponent implements OnInit {

  constructor() { }

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  options: ITreeOptions = {
    allowDrag: (node) => {
      console.log(node.getLastRoot);
      return true;
    },
    animateExpand: true,
    nodeClass: (node) => {
      return 'card';
    },
    useCheckbox: true
  };

  ngOnInit() {
  }

}
