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
 * Creates a datetime-field input box.
 *
 * @example <caption>Sample usage:</caption>
 * {
 *    name: "alfresco/forms/controls/DateTimeTextBox",
 *    id: "VALID_DATE_TIME_VALUE_1",
 *    config: {
 *       name: "validDateTime1",
 *       value: "2012-12-12T17:30:00",
 *       label: "Valid date time #1"
 *    }
 * }
 *
 * @module alfresco/forms/controls/DateTimeTextBox
 * @extends module:alfresco/forms/controls/BaseFormControl
 * @mixes module:alfresco/core/CoreWidgetProcessing
 * @author Igor Blanco
 */
define(["alfresco/core/CoreWidgetProcessing",
        "alfresco/forms/controls/BaseFormControl",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom-class",
        "alfresco/core/ObjectTypeUtils",
        "alfresco/forms/controls/DateTimeTextBoxControl"],
       function(CoreWidgetProcessing, BaseFormControl, declare, lang, domClass, ObjectTypeUtils) {

   return declare([BaseFormControl, CoreWidgetProcessing], {

      /**
       * This function is used to set or update the validationConfig
       *
       * @instance
       */
      configureValidation: function alfresco_forms_controls_DateTextBox__configureValidation() {
         if (!this.validationConfig || !ObjectTypeUtils.isArray(this.validationConfig)) {
            this.validationConfig = [];
         }
         this.validationConfig.push({
            validation: "customValidator",
            errorMessage: this.message("formValidation.datetime.error")
         });
      },

      /**
       * Instantiates and returns the DateTimeTextBoxControl wrapped by this widget.
       *
       * @override
       * @instance
       * @param    {object} config Configuration for the control
       * @returns  {object} The new control
       */
      createFormControl: function alfresco_forms_controls_PushButtons__createFormControl(config) {
         var widget = this.createWidget({
            name: "alfresco/forms/controls/DateTimeTextBoxControl",
            config: config
         });
         return widget;
      },

      /**
       * Ensure value is a date
       *
       * @instance
       * @param {object} validationConfig The configuration for this validator
       */
      customValidator: function alfresco_forms_controls_DateTextBox__customValidator(validationConfig){
         var currentValue = this.getValue(),
            isValid = typeof currentValue === "string";
         if(!isValid && !this._required) {
            isValid = this.wrappedWidget.hasEmptyDisplayValue();
         }
         this.reportValidationResult(validationConfig, isValid);
      },

      /**
       * Construct the config for the wrapped control.
       *
       * @instance
       * @override
       * @returns {object} The configuration for the form control.
       */
      getWidgetConfig: function alfresco_forms_controls_PushButtons__getWidgetConfig() {
         this.configureValidation();
         // Setup the widget config
         var widgetConfig = {
            id: this.id + "_CONTROL",
            name: this.name
         };

         // Set config only if available
         if (!isNaN(this.width)) {
            widgetConfig.width = this.width;
         }
         if (!isNaN(this.maxLineLength)) {
            widgetConfig.maxLineLength = this.maxLineLength;
         }
         if (!isNaN(this.percentGap)) {
            widgetConfig.percentGap = this.percentGap;
         }
         if (!isNaN(this.minPadding)) {
            widgetConfig.minPadding = this.minPadding;
         }

         // Pass back the config
         return widgetConfig;
      },

      /**
       * Run after widget created.
       *
       * @instance
       * @override
       */
      postCreate: function() {
         this.inherited(arguments);
         domClass.add(this.domNode, "alfresco-forms-controls-DateTimeTextBox");
         /* Intercept validation requests from the wrapped widget in order to run our own validation instead */
         this.wrappedWidget.validate = lang.hitch(this, function(){
            setTimeout(lang.hitch(this, this.validate), 0);
            return true;
         });
      }
   });
});