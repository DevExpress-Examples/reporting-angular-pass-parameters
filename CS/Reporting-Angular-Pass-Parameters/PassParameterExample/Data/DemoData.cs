using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassParameterExample.Data
{
    public class DemoItem
    {
        public string TestValue { get; set; }
    }
    public class DemoData
    {
        public List<DemoItem> GetData(int itemnumber)
        {
            List<DemoItem> items = new List<DemoItem>();
            for (int i = 0; i < itemnumber; i++)
            {
                items.Add(new DemoItem() { TestValue = $"Test{i}" });
            }
            return items;
        }
    }
}
