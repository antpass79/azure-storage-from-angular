import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { DownloadScriptCommandCorameteresBuilder } from 'src/services/download-script-command-parameters.builder';
import { DownloadScriptService } from 'src/services/download-script.service';
import { HttpClientModule } from '@angular/common/http';
import { AzureStorageConfigurationService } from 'src/services/azure-storage-configuration.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DownloadingSasDialog } from 'src/dialogs/downloading-sas.dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DownloadingSasDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    DownloadScriptCommandCorameteresBuilder,
    DownloadScriptService,AzureStorageConfigurationService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
