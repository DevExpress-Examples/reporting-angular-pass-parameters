<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/283966282/2022.2)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T919182)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# How to Pass Parameters from the Angular Client to a Report

This example demonstrates how to send parameters from the client side to the report displayed in the Document Viewer.

The first method constructs the report URL that includes the parameter as a query string and uses this URL to open a report. The report's URL is passed to the [ReportStorageWebExtension.GetData](https://docs.devexpress.com/XtraReports/DevExpress.XtraReports.Web.Extensions.ReportStorageWebExtension.GetData(System.String)) method at the server. You can implement and register a custom storage with the **GetData** method that parses the URL string, extracts the parameter values, creates a report, sets the report parameters and returns the report to the sender.

Another method uses the client-side [JSReportViewer.GetParametersModel](https://docs.devexpress.com/XtraReports/js-DevExpress.Reporting.Viewer.JSReportViewer.GetParametersModel) method that provides access to the report parameter model. When parameters are modified, a call to the [JSReportViewer.StartBuild](https://docs.devexpress.com/XtraReports/js-DevExpress.Reporting.Viewer.JSReportViewer.StartBuild) method is required to rebuild the document.

The sample application includes two buttons to show the methods described above. The JavaScript function hides the Document Viewer's side panel and sets the zoom to 100%. 

