/**
 * Copyright (C) 2005-2017 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * An input control that offers the functionality to set a date with time, rendered as a
 * single control.
 *
 * @module alfresco/forms/controls/DateTimeTextBoxControl
 * @extends external:dijit/_WidgetBase
 * @mixes external:dijit/_TemplatedMixin
 * @mixes external:dijit/_WidgetsInTemplateMixin
 * @mixes module:alfresco/core/Core
 * @author Igor Blanco
 */
define(["alfresco/core/Core",  
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/_WidgetBase",
        "dojo/date/stamp",
        "dojo/_base/declare", 
        "dojo/_base/lang", 
        "dojo/text!./templates/DateTimeTextBoxControl.html",
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox"], 
        function(Core, _TemplatedMixin, _WidgetsInTemplateMixin, _WidgetBase, stamp, declare, lang, template) {

      return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Core], {

         /**
          * The DOM node where the date part's widget is inserted
          */
         dateNode: null,

         /**
          * The ID of this control
          *
          * @instance
          * @type {string}
          * @default
          */
         id: null,

         /**
          * The name of this control in the form
          *
          * @instance
          * @type {string}
          * @default
          */
         name: null,

         /**
          * The root class of this widget
          *
          * @instance
          * @type {string}
          */
         rootClass: "alfresco-forms-controls-DateTimeTextBoxControl",

         /**
          * The HTML template to use for the widget.
          *
          * @override
          * @instance
          * @type {String}
          */
         templateString: template,

         /**
          * The DOM node where the time part's widget is inserted
          */
         timeNode: null,

         /**
          * Get the value currently assigned to the wrapped widget
          *
          * @instance
          * @returns {object} The current value of the field
          */
         getValue: function alfresco_forms_controls_DateTimeTextBoxControl__getValue() {
            var value = this.inherited(arguments);
            var date = this.dateNode.get('value');
            var time = this.timeNode.get('value');

            if (!date || !time) {
               return undefined;
            }

            /* 
             * Timezone is applied to both, the date and the time, so we must at least compensate
             * for one of them.
             */
            var timezoneOffset = time.getTimezoneOffset() * 60 * 1000; 
            var datetime = new Date(date.getTime() + time.getTime() - timezoneOffset);
            var returnValue = this.processDateValue(datetime);
            return returnValue;
         },

         hasEmptyDisplayValue: function alfresco_forms_controls_DateTimeTextBoxControl__hasEmptyDisplayValue() {
            return (this.dateNode.get("displayedValue") === "") && (this.timeNode.get("displayedValue") === "");
         },

         /**
          * Fires when the value is changed.
          *
          * @instance
          * @param {Object} evt The change event
          */
         _onInputChanged: function alfresco_forms_controls_DateTimeTextBoxControl___onInputChanged(evt) {
            this._changeAttrValue("value", this.getValue());
         },

         /**
          * Widget has been created (but not necessarily sub-widgets)
          *
          * @instance
          * @override
          */
         postCreate: function alfresco_forms_controls_DateTimeTextBoxControl__postCreate() {
            this.inherited(arguments);
            this.dateNode.onChange = lang.hitch(this, this._onInputChanged);
            /*
             * Intercept widget's validation calls so that we call our own validation if there is one
             */
            this.dateNode.validate = lang.hitch(this, function(){
               if (this.validate) {
                  this.validate();
               };
               return true;
            });
            this.timeNode.onChange = lang.hitch(this, this._onInputChanged);
            /*
             * Intercept widget's validation calls so that we call our own validation if there is one
             */
            this.timeNode.validate = lang.hitch(this, function(){
               if (this.validate) {
                  this.validate();
               };
               return true;
            });
         },

         /**
          * Processes a value to apply date formatting as necessary.
          *
          * @instance
          * @param  {object} value The value to process
          * @return {object} The processed value
          * @since 1.0.91
          */
         processDateValue: function alfresco_forms_controls_DateTimeTextBoxControl__processDateValue(value) {
            var returnValue = value && stamp.toISOString(value, { selector: "datetime" });
            if (!returnValue && typeof this.unsetReturnValue !== "undefined")
            {
               returnValue = this.unsetReturnValue;
            }
            return returnValue;
         },

         /**
          * <p>Set the value of the control.</p>
          * 
          *
          * @instance
          * @param {string} value The value to be set
          */
         setValue: function alfresco_forms_controls_DateTimeTextBoxControl__setValue(value) {

            // Discard null, undefined and empty-string values
            if (value === null || typeof value === "undefined") {
               this.alfLog("warn", "setValue() not completed as invalid value passed to DateTimeTextBoxControl (" + value + ")");
               return;
            }

            var datetime = stamp.fromISOString(value);
            this.dateNode.set('value', datetime);
            this.timeNode.set('value', datetime);
         }
      });
   }
);