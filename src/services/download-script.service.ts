import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DownloadScriptService {
    constructor(private httpClient: HttpClient) {
    }

    async downloadAsync(commandScript: string, fileName: string) {
        let file = await this.httpClient.get('assets/download-script-template.txt', {responseType: 'text'}).toPromise();
        let script = file
            .replace("AZCOPY_COMMAND_PLACEHOLDER", commandScript)
            // replace all occurrences
            .split('%')
            .join('%%');

        let data = "data:text/json;charset=utf-8," + encodeURIComponent(script);
        let downloader = document.createElement('a');

        downloader.setAttribute('href', data);
        downloader.setAttribute('download', `${fileName}.bat`);
        downloader.click();
        downloader.remove();
    }
}