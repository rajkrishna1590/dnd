"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var underscore_1 = require("underscore");
var ReadComponent = (function () {
    // underscore: Underscore;
    function ReadComponent(_ngZone) {
        this._ngZone = _ngZone;
        this.u = underscore_1.default;
        /*constructor(private _under: Underscore) {
           this.underscore=_under;
       }*/
        this.dragOperation = false;
        this.test = "test";
        this.containers = [
            new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
            new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
            new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
        ];
        this.widgets = [];
        this.ngZone = _ngZone;
    }
    ReadComponent.prototype.addTo = function ($event, underscore) {
        console.log($event);
        if ($event) {
            underscore.filter([], function (item) {
                console.log(item);
                return item;
                console.log(JSON.stringify(this.containers));
            });
        }
    };
    ReadComponent.prototype._onChange = function (files) {
        function CSVToArray(strData, strDelimiter) {
            // Check to see if the delimiter is defined. If not,
            // then default to comma.
            strDelimiter = (strDelimiter || ",");
            // Create a regular expression to parse the CSV values.
            var objPattern = new RegExp((
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
            // Create an array to hold our data. Give the array
            // a default empty first row.
            var arrData = [[]];
            // Create an array to hold our individual pattern
            // matching groups.
            var arrMatches = null;
            // Keep looping over the regular expression matches
            // until we can no longer find a match.
            while (arrMatches = objPattern.exec(strData)) {
                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[1];
                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push([]);
                }
                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[2]) {
                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    var strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
                }
                else {
                    // We found a non-quoted value.
                    var strMatchedValue = arrMatches[3];
                }
                // Now that we have our value string, let's add
                // it to the data array.
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            // Return the parsed data.
            return (arrData);
        }
        function CSV2JSON(csv) {
            var array = CSVToArray(csv);
            var objArray = [];
            for (var i = 1; i < array.length; i++) {
                objArray[i - 1] = {};
                for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                    var key = array[0][k];
                    objArray[i - 1][key] = array[i][k];
                }
            }
            var json = JSON.stringify(objArray);
            var str = json.replace(/},/g, "},\r\n");
            return JSON.parse(json);
        }
        if (files && files.length > 0) {
            var file = files.item(0);
            //Now you can get
            console.log(file.name);
            console.log(file.size);
            console.log(file.type);
            var reader = new FileReader();
            reader.onload = function (me) {
                return function (event) {
                    me.ngZone.run(function () {
                        var data = CSV2JSON(event.target.result);
                        for (var i = 0; i < data.length; i++) {
                            var wid = [];
                            if (!data[i] || !data[i].widgets) {
                                continue;
                            }
                            data[i].widgets = data[i].widgets.split(",");
                            for (var k = 0; k < data[i].widgets.length; k++) {
                                wid.push(new Widget(data[i].widgets[k]));
                            }
                            me.containers.push(new Container(data[i].id, data[i].name, wid));
                        }
                    });
                };
            }(this);
            reader.readAsText(file);
        }
    };
    return ReadComponent;
}());
ReadComponent = __decorate([
    core_1.Component({
        selector: 'file-upload',
        template: "\n      <input type=\"file\" class=\"upload\" (change)=\"_onChange($event.target.files)\">\n\t  <h4>Move items between multi list sortable containers</h4>\n<div class=\"row\" *ngIf=\"containers.length\">\n    <div class=\"col-sm-3\">\n        Drag Containers <input type=\"checkbox\" [(ngModel)]=\"dragOperation\"/>\n        <div dnd-sortable-container [sortableData]=\"containers\" [dropZones]=\"['container-dropZone']\">\n            <div class=\"col-sm3\"\n                    *ngFor=\"let container of containers; let i = index\"\n                    dnd-sortable [sortableIndex]=\"i\" [dragEnabled]=\"dragOperation\">\n                <div class=\"panel panel-warning\"\n                    dnd-sortable-container [sortableData]=\"container.widgets\" [dropZones]=\"['widget-dropZone']\">\n                    <div class=\"panel-heading\" >\n                        {{container.id}} - {{container.name}}\n                    </div>\n                    <div class=\"panel-body\">\n                        <ul class=\"list-group\">\n                            <li *ngFor=\"let widget of container.widgets; let x = index\" class=\"list-group-item\"\n                                dnd-sortable [sortableIndex]=\"x\" [dragEnabled]=\"true\"\n                                [dragData]=\"{'widget':widget,'container':container}\" (onDropSuccess)=\"addTo($event,u)\">{{widget.name}}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n      "
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], ReadComponent);
exports.ReadComponent = ReadComponent;
var Container = (function () {
    function Container(id, name, widgets) {
        this.id = id;
        this.name = name;
        this.widgets = widgets;
    }
    return Container;
}());
var Widget = (function () {
    function Widget(name) {
        this.name = name;
    }
    return Widget;
}());
//# sourceMappingURL=home.component.js.map