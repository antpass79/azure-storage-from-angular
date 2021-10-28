import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BlobServiceClient, ContainerItem } from '@azure/storage-blob';
import { DownloadingSasDialog } from 'src/dialogs/downloading-sas.dialog';
import { AzureStorageConfigurationService } from 'src/services/azure-storage-configuration.service';
import { DownloadScriptCommandCorameteresBuilder } from 'src/services/download-script-command-parameters.builder';
import { DownloadScriptService } from 'src/services/download-script.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columnDefs: string[] = ['name', 'lastModified', 'script', 'download'];
  containers: ContainerItem[] = [];

  constructor(
    private dialog: MatDialog,
    private downloadScriptCommandCorameteresBuilder: DownloadScriptCommandCorameteresBuilder,
    private downloadScriptService: DownloadScriptService,
    private azureStorageConfigurationService: AzureStorageConfigurationService) {    
  }

  async ngOnInit() {
    let configuration = await this.azureStorageConfigurationService.getAsync();

    const blobServiceClient = new BlobServiceClient(
      `https://${configuration.StorageAccount}.blob.core.windows.net${configuration.Sas}`);

      let containers: ContainerItem[] = [];
      let containerIterator = (await blobServiceClient.listContainers());
      for await (const container of containerIterator) {
        console.log(`Container: ${container.name}`);
        console.log(container);
        containers.push(container);
      }

      this.containers = containers.filter(container => !container.name.includes("$web"));
    }

    async onScript(container: ContainerItem) {
      let token: string = '';
      const dialogRef = this.dialog.open(DownloadingSasDialog, {
        width: '300px',
        data: { token: token }
      });
  
      token = await dialogRef.afterClosed().toPromise();
      if (!token)
        return;
        
      try {

        let configuration = await this.azureStorageConfigurationService.getAsync();
        let commandScript = this.downloadScriptCommandCorameteresBuilder
          .withstorageAccount(configuration.StorageAccount)
          .withSas(token)
          .withRelease(container.name)
          .withOutputFolder(configuration.OutputFolder)
          .withFileName(container.name)
          .build();

          await this.downloadScriptService.downloadAsync(commandScript, container.name);
      } catch (error) {
          alert(error);
      }
    }

    onDownload(container: ContainerItem) {
      // const blobServiceClient = new BlobServiceClient(
      //   `https://${account}.blob.core.windows.net${sas}`);        
      }
  }
