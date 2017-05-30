"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ReadComponent = (function () {
    function ReadComponent() {
        this.groups = [
            {
                name: 'Group A',
                items: [{ name: 'Item A' }, { name: 'Item B' }, { name: 'Item C' }, { name: 'Item D' }]
            },
            {
                name: 'Group B',
                items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
            }
        ];
    }
    return ReadComponent;
}());
ReadComponent = __decorate([
    core_1.Component({
        selector: 'file-upload',
        template: "\n      <input type=\"file\" class=\"upload\" (change)=\"_onChange($event.target.files)\">\n\t  <div class='wrapper'>\n  <div class='container' *ngFor='let group of groups' [dragula]='\"nested-bag\"'>\n    <div *ngFor='let item of group.items' [innerHtml]='item.name'></div>\n  </div>\n</div>      "
    })
], ReadComponent);
exports.ReadComponent = ReadComponent;
//# sourceMappingURL=home.component_dragula.js.map