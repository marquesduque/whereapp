using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text;

namespace ASP
{
    public static class HtmlExtensions
    {
        #region TextBox
        public static MvcHtmlString TextBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(new object());
            return HtmlExtensions.TextBoxMetronicFor<TModel, TProperty>(htmlHelper, expression, (string)null, dictionary);
        }
        public static MvcHtmlString TextBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, object htmlAttributes)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            return HtmlExtensions.TextBoxMetronicFor<TModel, TProperty>(htmlHelper, expression, (string)null, dictionary);
        }
        public static MvcHtmlString TextBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string format, object htmlAttributes)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            return HtmlExtensions.TextBoxMetronicFor<TModel, TProperty>(htmlHelper, expression, format, dictionary);
        }
        public static MvcHtmlString TextBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string format, IDictionary<string, object> htmlAttributes)
        {
            var value = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData).Model;
            if (htmlAttributes.ContainsKey("class"))
            {
                htmlAttributes["class"] += " form-control " + ((value == null || value.ToString() == "") ? "" : "edited");
            }
            else
            {
                htmlAttributes.Add(new KeyValuePair<string, object>("class", "form-control " + ((value == null || value.ToString() == "") ? "" : "edited")));
            }
            ModelMetadata metaData = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData);
            string textbox = System.Web.Mvc.Html.InputExtensions.TextBoxFor(htmlHelper, expression, format, htmlAttributes).ToHtmlString();
            return PartialExtensions.Partial(htmlHelper, "_TextBox", new
            {
                input = System.Web.Mvc.Html.InputExtensions.TextBoxFor(htmlHelper, expression, format, htmlAttributes).ToHtmlString(),
                display = System.Web.Mvc.Html.DisplayNameExtensions.DisplayNameFor(htmlHelper, expression).ToHtmlString(),
                property = System.Web.Mvc.Html.NameExtensions.NameFor(htmlHelper, expression).ToHtmlString(),
                description = metaData.Description,
                validator = System.Web.Mvc.Html.ValidationExtensions.ValidationMessageFor(htmlHelper, expression).ToHtmlString(),
                icon = (htmlAttributes["datepicker"] != null) ? "fa-calendar" : (htmlAttributes["icon"] == null ? (textbox.Contains("number") ? "fa-sort-numeric-asc" : "fa-align-left") : htmlAttributes["icon"])
            });
        }
        #endregion

        #region DropDown

        public static MvcHtmlString DropDownMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(new object());
            return HtmlExtensions.DropDownMetronicFor<TModel, TProperty>(htmlHelper, expression, selectList, dictionary);
        }
        public static MvcHtmlString DropDownMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList, object htmlAttributes)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            return HtmlExtensions.DropDownMetronicFor<TModel, TProperty>(htmlHelper, expression, selectList, dictionary);
        }
        public static MvcHtmlString DropDownMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList, IDictionary<string, object> htmlAttributes)
        {
            var value = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData).Model;
            if (htmlAttributes.ContainsKey("class"))
            {
                htmlAttributes["class"] += " form-control " + ((value == null || value.ToString() == "") ? "" : "edited");
            }
            else
            {
                htmlAttributes.Add(new KeyValuePair<string, object>("class", "form-control " + ((value == null || value.ToString() == "") ? "" : "edited")));
            }
            ModelMetadata metaData = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData);
            List<SelectListItem> ListItems = selectList.ToList();
            ListItems.Insert(0, new SelectListItem());
            string dropdown = System.Web.Mvc.Html.SelectExtensions.DropDownListFor(htmlHelper, expression, ListItems, htmlAttributes).ToHtmlString();
            return PartialExtensions.Partial(htmlHelper, "_DropDown", new
            {
                input = dropdown,
                display = System.Web.Mvc.Html.DisplayNameExtensions.DisplayNameFor(htmlHelper, expression).ToHtmlString(),
                property = System.Web.Mvc.Html.NameExtensions.NameFor(htmlHelper, expression).ToHtmlString(),
                description = metaData.Description,
                validator = System.Web.Mvc.Html.ValidationExtensions.ValidationMessageFor(htmlHelper, expression).ToHtmlString(),
                icon = htmlAttributes["icon"] == null ? "fa-list" : htmlAttributes["icon"]
            });
        }
        #endregion

        #region RadioList
        public static MvcHtmlString RadioListMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(new object());
            return HtmlExtensions.RadioListMetronicFor<TModel, TProperty>(htmlHelper, expression, selectList, dictionary);
        }
        public static MvcHtmlString RadioListMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList, object htmlAttributes)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            return HtmlExtensions.RadioListMetronicFor<TModel, TProperty>(htmlHelper, expression, selectList, dictionary);
        }
        public static MvcHtmlString RadioListMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IEnumerable<SelectListItem> selectList, IDictionary<string, object> htmlAttributes)
        {
            ModelMetadata metaData = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData);

            return PartialExtensions.Partial(htmlHelper, "_RadioList", new
            {
                expression = expression,
                data = selectList.ToList(),
                validator = System.Web.Mvc.Html.ValidationExtensions.ValidationMessageFor(htmlHelper, expression).ToHtmlString(),
                display = System.Web.Mvc.Html.DisplayNameExtensions.DisplayNameFor(htmlHelper, expression).ToHtmlString(),
                property = System.Web.Mvc.Html.NameExtensions.NameFor(htmlHelper, expression).ToHtmlString(),
                data_val_required = "Campo obrigatório",
                data_val = metaData.IsRequired.ToString().ToLower(),
            });
        }
        #endregion

        #region Checkbox
        public static MvcHtmlString CheckBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(new object());
            return HtmlExtensions.CheckBoxMetronicFor<TModel, TProperty>(htmlHelper, expression, dictionary);
        }
        public static MvcHtmlString CheckBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, object htmlAttributes)
        {
            var dictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            return HtmlExtensions.CheckBoxMetronicFor<TModel, TProperty>(htmlHelper, expression, dictionary);
        }
        public static MvcHtmlString CheckBoxMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, IDictionary<string, object> htmlAttributes)
        {
            ModelMetadata metaData = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData);

            return PartialExtensions.Partial(htmlHelper, "_CheckBox", new
            {
                expression = expression,
                validator = System.Web.Mvc.Html.ValidationExtensions.ValidationMessageFor(htmlHelper, expression).ToHtmlString(),
                display = System.Web.Mvc.Html.DisplayNameExtensions.DisplayNameFor(htmlHelper, expression).ToHtmlString(),
                property = System.Web.Mvc.Html.NameExtensions.NameFor(htmlHelper, expression).ToHtmlString(),
                value = true,
                data_val_required = "Campo obrigatório",
                data_val = metaData.IsRequired.ToString().ToLower(),
            });
        }


        #endregion

        #region Chart

        public static MvcHtmlString ChartMetronicFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var value = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData).Model;
            return PartialExtensions.Partial(htmlHelper, "_Chart", value);
           
        }
        
        #endregion

        private static IDictionary<string, object> SetCommonAttributes<TModel, TProperty>(HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, ref IDictionary<string, object> htmlAttributes)
        {
            if (htmlHelper == null)
            {
                throw new ArgumentNullException("htmlHelper");
            }

            if (expression == null)
            {
                throw new ArgumentNullException("expression");
            }

            if (htmlAttributes == null)
            {
                htmlAttributes = new Dictionary<string, object>();
            }

            if (!htmlAttributes.ContainsKey("class"))
            {
                htmlAttributes.Add("class", "form-control input-sm");
            }

            return htmlAttributes;
        }

    }

}