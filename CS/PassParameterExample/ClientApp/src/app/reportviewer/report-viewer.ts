import { PreviewElements } from "devexpress-reporting/dx-webdocumentviewer"
import { Component, Inject, ViewEncapsulation, ViewChild, OnInit  } from '@angular/core';
import { DxReportViewerComponent } from 'devexpress-reporting-angular';


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
    reportUrl: string = "TestReport";
    invokeAction: string = '/DXXRDV';

    // Pass a parameter value by using a reportUrl on startup
    ngOnInit() {
        var parameterValue = "Hello World";
        this.reportUrl = "TestReport?parameter3=" + parameterValue;
    }

    // Pass a parameter value each time the report is submitted
    // Note: The value entered on the Parameters panel will be ignored
    ParametersSubmitted(event) {
        var parameterValue = 12345;
        event.args.Parameters.filter(function (p) { return p.Key == "parameter4"; })[0].Value = parameterValue;
    }

    // Pass a parameter value with a reportUrl
    setParameter1() {
        var parameterValue = 40;
        this.viewer.bindingSender.OpenReport(this.reportUrl + "&parameter1=" + parameterValue);
    }

    // Pass a parameter value with the parameters model
    // Note: This approach can be used only for parameters that have the Visible property enabled
    setParameter2() {
        var parameterValue = true;
        this.viewer.bindingSender.GetParametersModel()["parameter2"](parameterValue);
        this.viewer.bindingSender.StartBuild();
    }

    // (Optional) Hide the Parameters panel
    CustomizeElements(event) {
        var rightPanel = event.args.GetById(PreviewElements.RightPanel);
        var index = event.args.Elements.indexOf(rightPanel);
        event.args.Elements.splice(index, 1);
    }    

    constructor(@Inject('BASE_URL') public hostUrl: string) { }
}
