import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { DxReportViewerComponent } from 'devexpress-reporting-angular';
import DevExpress from "devexpress-reporting/dx-webdocumentviewer" 

@Component({
    selector: 'report-viewer',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './report-viewer.html',
    styleUrls: [
        "../../../node_modules/jquery-ui/themes/base/all.css",
        "../../../node_modules/devextreme/dist/css/dx.common.css",
        "../../../node_modules/devextreme/dist/css/dx.light.css",
        "../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
        "../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css",
        "../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css"
    ]
})
export class ReportViewerComponent {
    @ViewChild(DxReportViewerComponent, { static: false }) viewer: DxReportViewerComponent;
    reportUrl: string = "TestReport?parameter1=3";
    invokeAction: string = '/DXXRDV';

    CustomizeElements(event) {
        var rightPanel = event.args.GetById(DevExpress.Reporting.Viewer.PreviewElements.RightPanel);
        var index = event.args.Elements.indexOf(rightPanel);
        event.args.Elements.splice(index, 1);
    }

    setParameter1() {
        this.viewer.bindingSender.OpenReport("TestReport?parameter1=40");
        this.viewer.bindingSender.GetReportPreview().zoom(1.0);
    }
    setParameter2() {
        var parameterValue = true;
        this.viewer.bindingSender.GetParametersModel()["parameter2"](parameterValue);
        this.viewer.bindingSender.StartBuild();
        this.viewer.bindingSender.GetReportPreview().zoom(1.0);
    }

    constructor(@Inject('BASE_URL') public hostUrl: string) { }
}