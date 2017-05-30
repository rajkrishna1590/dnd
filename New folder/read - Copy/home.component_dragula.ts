import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {Dragula, DragulaService} from 'ng2-dragula';

@Component({
   selector: 'file-upload',
   template: `
      <input type="file" class="upload" (change)="_onChange($event.target.files)">
	  <div class='wrapper'>
  <div class='container' *ngFor='let group of groups' [dragula]='"nested-bag"'>
    <div *ngFor='let item of group.items' [innerHtml]='item.name'></div>
  </div>
</div>      `
})
export class ReadComponent implements OnInit {
  public groups: Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Item A'},{name: 'Item B'},{name: 'Item C'},{name: 'Item D'}]
    },
    {
      name: 'Group B',
      items: [{name: 'Item 1'},{name: 'Item 2'},{name: 'Item 3'},{name: 'Item 4'}]
    }
  ];
}