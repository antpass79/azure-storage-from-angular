import { Injectable } from "@angular/core";

@Injectable()
export class DownloadScriptCommandCorameteresBuilder {
    private storageAccount: string | undefined = undefined;
    withstorageAccount(storageAccount: string): DownloadScriptCommandCorameteresBuilder {
        this.storageAccount = storageAccount;
        return this;
    }

    private releaseName: string | undefined = undefined;
    withRelease(releaseName: string): DownloadScriptCommandCorameteresBuilder {
        this.releaseName = releaseName;
        return this;
    }

    private outputFolder: string | undefined = undefined;
    withOutputFolder(outputFolder: string): DownloadScriptCommandCorameteresBuilder {
        this.outputFolder = outputFolder;
        return this;
    }

    private fileName: string | undefined = undefined;
    withFileName(fileName: string): DownloadScriptCommandCorameteresBuilder {
        this.fileName = fileName;
        return this;
    }

    private sas: string | undefined = undefined;
    withSas(sas: string): DownloadScriptCommandCorameteresBuilder {
        this.sas = sas;
        return this;
    }

    build(): string {
        if (!this.CheckConsisitency())
            throw Error("Invalid parameters");

        let outputFile = this.outputFolder ? `${this.outputFolder}\\${this.fileName}` : this.fileName;
        let script = `"https://${this.storageAccount}.blob.core.windows.net/${this.releaseName}${this.sas}" "${outputFile}" --recursive`;
        return script;
    }

    private CheckConsisitency(): boolean {
        if (!this.storageAccount || !this.releaseName || !this.sas || !this.fileName)
            return false;

        return true;
    }
}