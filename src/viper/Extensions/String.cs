using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viper.Extensions
{
    public static class StringExtensions
    {
        public static Boolean LowerCaseEquals(this string a, string b)
        {
            return string.Equals(a, b, StringComparison.OrdinalIgnoreCase);
        }
        public static string NotEmptyThen(this string a, string b)
        {
            return a.Length > 0 ? b : "";
        }
        public static Boolean Empty(this string a)
        {
            return string.IsNullOrEmpty(a);
        }
    }
}
