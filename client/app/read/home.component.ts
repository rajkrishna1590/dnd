import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index'; 
import { SchemaService } from '../_services/index';

import * as _ from 'underscore';

import { AlertService, UserService } from '../_services/index';



@Component({
   selector: 'file-upload',
   template: `
      <input type="file" class="upload" (change)="_onChange($event.target.files)">
	  
	  <h4>Move items between multi list sortable containers</h4>
<div class="row" *ngIf="containers.length"> 
    <div class="col-sm-3">
        Drag Containers <input type="checkbox" [(ngModel)]="dragOperation"/>
        <div dnd-sortable-container [sortableData]="containers" [dropZones]="['container-dropZone']">
            <div class="col-sm3"
                    *ngFor="let container of containers; let i = index"
                    dnd-sortable [sortableIndex]="i" [dragEnabled]="dragOperation">
                <div class="panel panel-warning"
                    dnd-sortable-container [sortableData]="container.widgets" [dropZones]="['widget-dropZone']">
                    <div class="panel-heading" >
                        {{container.id}} - {{container.name}}
                    </div>
                    <div class="panel-body">
                        <ul class="list-group">
                            <li *ngFor="let widget of container.widgets; let x = index" class="list-group-item"
                                dnd-sortable [sortableIndex]="x" [dragEnabled]="true"
                                [dragData]="{'widget':widget,'container':container}" (onDropSuccess)="addTo($event)">{{widget.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
		<button  (click)="createSchema()" [disabled]="loading" class="btn btn-primary">Register</button>
		  
    </div>	
      `
})

export class ReadComponent  {
	 //ngZone: NgZone;
	// underscore: Underscore;
	  
	   constructor(
        private ngZone: NgZone,
		private router: Router,
        private schemaService: SchemaService,
		 private alertService: AlertService) { }
		
	   /*constructor(private _under: Underscore) {
		  this.underscore=_under;
	  }*/
	dragOperation: boolean = false;
	test: String = "test";
	 
   containers: Array<Container> = [
       /* new Container(1, 'Container 1', [{"name":"test","ref":"1"},{"name":"test1","ref":"1"},{"name":"test3","ref":"1"}]),
        new Container(2, 'Container 2', [{"name":"test21","ref":"2"},{"name":"test2","ref":"2"},{"name":"test3","ref":"3"}]) */
    ];
	containers1: Array<Container> = [
        /* new Container(1, 'Container 1', [{"name":"test","ref":"1"},{"name":"test1","ref":"1"},{"name":"test3","ref":"1"}]),
        new Container(2, 'Container 2', [{"name":"test21","ref":"2"},{"name":"test2","ref":"2"},{"name":"test3","ref":"3"}]) */
    ];
	
	createSchema() {
        this.loading = true;
        this.schemaService.createScehma(this.containers)
            .subscribe(
                data => { 
                    this.alertService.success('Schema Service successful', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    widgets: Array<Widget> = [];
	addTo($event: any) {
		console.log(JSON.stringify($event));
        if ($event) {

 var tmpArr= JSON.parse(JSON.stringify(this.containers));
 var tmpArr1= JSON.parse(JSON.stringify(this.containers1));
 
 console.log(JSON.stringify(this.containers));
console.log(JSON.stringify(this.containers1)); 
 
 _.each(tmpArr, function(item){ 
	 _.filter(tmpArr1, function(item1){ 
		if(item1.id===item.id){
			item1.widgets = _.union(item1.widgets,item.widgets);
			item1.widgets =  _.uniq(item1.widgets,function(item){
				return item.name+item.ref;
				})
		}
		return;
	 });
 });
 
this.containers =tmpArr1;

			  
        }
    } 
	
      _onChange(files: FileList) : void {
		function CSVToArray(strData,strDelimiter) {
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
						var strMatchedValue = arrMatches[2].replace(
						new RegExp("\"\"", "g"), "\"");
					} else {
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
					objArray[i - 1][key] = array[i][k]
				}
			}

			var json = JSON.stringify(objArray);
			var str = json.replace(/},/g, "},\r\n");			
			return JSON.parse(json);
		}
         if(files && files.length > 0) {
              let file : File = files.item(0);
              //Now you can get
              console.log(file.name);
              console.log(file.size);
              console.log(file.type);
			  var reader = new FileReader();
			  reader.onload = function(me){ 
				return  function(event) {				
				 
				 me.ngZone.run(() => {
					 var data =  CSV2JSON(event.target.result);
					 var typeArr =[];
					 for(var i=0;i<data.length;i++){
						 if(typeArr.indexOf(data[i].type)!==-1){
							 me.containers=[];
							 me.containers1=[];
							 alert("Duplicate Type Entered" + data[i].type+" at "+ i+1);
							 break;
						 }
						 var wid =[]; 
						 if(!data[i] || !data[i].widgets){
							 continue;
						 }
						 typeArr.push(data[i].type);
						 data[i].widgets = data[i].widgets.split(",");
						  
						 for(var k=0;k<data[i].widgets.length;k++){
							  wid.push({"name":data[i].widgets[k],"ref":data[i].type});
						  }
						  var obj = {
							 "id" : i+1,
							 "name":data[i].type,
							 "widgets":wid
						  }
						 me.containers.push(obj);
					 }
					me.containers1 = JSON.parse(JSON.stringify(me.containers));				 
				}); 
				  
			  };
			  }(this)
			  reader.readAsText(file);
         }
    }
	




}

class Container {
  constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
}

class Widget {
  constructor(public name: string) {
	  
  }
}