import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import {DndModule} from 'ng2-dnd';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, SchemaService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UploadComponent } from './upload/index';
import { ReadComponent } from './read/index';
import { DragComponent } from './drag/index';

@NgModule({
    imports: [
        BrowserModule,
		DndModule.forRoot(),
        FormsModule,
        HttpModule,
        routing,
		Ng2DragDropModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
		FileSelectDirective,
		UploadComponent,
		ReadComponent,
		DragComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
		SchemaService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }