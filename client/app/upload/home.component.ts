import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'my-app',
    template: `<nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                            <li><a>File Upload</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </nav>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <form> 
                                <div class="form-group">
                                    <label for="single">single</label>
                                    <input type="file" class="form-control" name="single" ng2FileSelect [uploader]="uploader" />                                  
                                </div>            
                            </form>
                        </div>
                        <div class="col-md-8">
                           

                            <table class="table">
                                 
                                <tbody>
                                <tr *ngFor="let item of uploader.queue">
                                    <td><strong>{{ item.file.name }}</strong></td>
                                    <td nowrap>{{ item.file.size/1024/1024 | number:'.2' }} MB</td>
                                     
                                    <td class="text-center">
                                        <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                                        
                                        <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                                    </td>
                                    <td nowrap>
                                        <button type="button" class="btn btn-success btn-xs"
                                                (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                                            <span class="glyphicon glyphicon-upload"></span> Upload
                                        </button> 
                                        <button type="button" class="btn btn-danger btn-xs"
                                                (click)="item.remove()">
                                            <span class="glyphicon glyphicon-trash"></span> Remove
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div>
                                <div>
                                    progress:
                                    <div class="progress" style="">
                                        <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>`
})
export class UploadComponent {
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
} 