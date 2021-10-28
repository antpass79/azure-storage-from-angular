import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AzureStorageConfiguration } from "src/models/azure-storage-configuration";

@Injectable()
export class AzureStorageConfigurationService {
    constructor(private httpClient: HttpClient) {
    }
    
    async getAsync(): Promise<AzureStorageConfiguration> {
        return await this.httpClient.get<AzureStorageConfiguration>('assets/config.json', {responseType: 'json'}).toPromise();
    }
}