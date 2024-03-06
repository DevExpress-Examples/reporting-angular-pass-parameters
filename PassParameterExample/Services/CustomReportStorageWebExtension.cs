using DevExpress.XtraReports.UI;
using DevExpress.XtraReports.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using PassParameterExample.PredefinedReports;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace PassParameterExample.Services {
    public class CustomReportStorageWebExtension : ReportStorageWebExtension {
        readonly string ReportDirectory;
        const string FileExtension = ".repx";
        public CustomReportStorageWebExtension(IWebHostEnvironment env) {
            ReportDirectory = Path.Combine(env.ContentRootPath, "Reports");
            if (!Directory.Exists(ReportDirectory)) {
                Directory.CreateDirectory(ReportDirectory);
            }
        }
        private bool IsWithinReportsFolder(string url, string folder) {
            var rootDirectory = new DirectoryInfo(folder);
            var fileInfo = new FileInfo(Path.Combine(folder, url));
            return fileInfo.Directory.FullName.ToLower().StartsWith(rootDirectory.FullName.ToLower());
        }
        public override bool CanSetData(string url) { return true; }
        public override bool IsValidUrl(string url) { return Path.GetFileName(url) == url; }
        public override byte[] GetData(string url) {
            try {
                string[] parts = url.Split("?");
                string reportName = parts[0];
                string parametersString = parts.Length > 1 ? parts[1] : String.Empty;
                XtraReport report = null;

                if (Directory.EnumerateFiles(ReportDirectory).
                    Select(Path.GetFileNameWithoutExtension).Contains(reportName)) {
                    byte[] reportBytes = File.ReadAllBytes(
                        Path.Combine(ReportDirectory, reportName + FileExtension));
                    using (MemoryStream ms = new MemoryStream(reportBytes))
                        report = XtraReport.FromStream(ms);
                }
                if (ReportsFactory.Reports.ContainsKey(reportName)) {
                    report = ReportsFactory.Reports[reportName]();
                }

                if (report != null) {
                    // Assign parameters here
                    var parameters = HttpUtility.ParseQueryString(parametersString);
                    foreach (string parameterName in parameters.AllKeys) {
                        report.Parameters[parameterName].Value = Convert.ChangeType(
                            parameters.Get(parameterName), report.Parameters[parameterName].Type);
                    }
                    report.RequestParameters = false;

                    using (MemoryStream ms = new MemoryStream()) {
                        report.SaveLayoutToXml(ms);
                        return ms.ToArray();
                    }
                }
            } catch (Exception ex) {
                throw new DevExpress.XtraReports.Web.ClientControls.FaultException(
                    "Could not get report data.", ex);
            }
            throw new DevExpress.XtraReports.Web.ClientControls.FaultException(
                string.Format("Could not find report '{0}'.", url));
        }

        public override Dictionary<string, string> GetUrls() {
            return Directory.GetFiles(ReportDirectory, "*" + FileExtension)
                                     .Select(Path.GetFileNameWithoutExtension)
                                     .Union(ReportsFactory.Reports.Select(x => x.Key))
                                     .ToDictionary<string, string>(x => x);
        }
        public override void SetData(XtraReport report, string url) {
            if (!IsWithinReportsFolder(url, ReportDirectory))
                throw new DevExpress.XtraReports.Web.ClientControls.FaultException("Invalid report name.");
            report.SaveLayoutToXml(Path.Combine(ReportDirectory, url + FileExtension));
        }
        public override string SetNewData(XtraReport report, string defaultUrl) {
            SetData(report, defaultUrl);
            return defaultUrl;
        }
    }
}
