model.jsonModel = {
   services: [
      {
         name: "alfresco/services/LoggingService",
         config: {
            loggingPreferences: {
               enabled: true,
               all: true
            }
         }
      },
      "alfresco/services/ErrorReporter"
   ],
   widgets: [
      {
         name: "alfresco/layout/HorizontalWidgets",
         config: {
            widgets: [
               {
                  id: "VALID_DATE_TIMES_FORM",
                  name: "alfresco/forms/Form",
                  config: {
                     pubSubScope: "FORM1_",
                     okButtonPublishTopic: "VALID_DATE_TIMES_FORM_SUBMIT",
                     widgets: [
                        {
                           id: "VALID_DATE_TIME_VALUE_1",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              fieldId: "VALID1",
                              name: "validDateTime1",
                              value: "2012-12-25T17:30:00",
                              label: "Valid datetime",
                              description: "Preset with the value \"2012-12-25T17:30:00\""
                           }
                        },
                        {
                           id: "VALID_DATE_TIME_VALUE_2",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              name: "validDateTime2",
                              value: "2015-10-31T09:00:00",
                              label: "Valid datetime (mandatory)",
                              description: "Preset with the value \"2015-10-31T09:00:00\"",
                              requirementConfig: {
                                 initialValue: true
                              }
                           }
                        }
                     ]
                  }
               },
               {
                  id: "OTHER_DATE_TIMES_FORM",
                  name: "alfresco/forms/Form",
                  config: {
                     okButtonPublishTopic: "OTHER_DATE_TIMES_FORM_SUBMIT",
                     widgets: [
                        {
                           id: "RULES_CHECKER",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              fieldId: "RULES_CHECKER",
                              name: "datetime3",
                              value: null,
                              label: "Any Date",
                              description: "Enter a datetime via the keyboard to ensure that the TextBox below becomes required."
                           }
                        },
                        {
                           id: "RULES_SUBSCRIBER",
                           name: "alfresco/forms/controls/TextBox",
                           config: {
                              fieldId: "RULES_SUBSCRIBER",
                              label: "Test",
                              name: "test",
                              description: "This should become required when a datetime is entered into the previous DataTimeTextBox",
                              value: "",
                              requirementConfig: {
                                 initialValue: false,
                                 rules: [
                                    {
                                       targetId: "RULES_CHECKER",
                                       isNot: ["",null]
                                    }
                                 ]
                              }
                           }
                        }
                     ]
                  }
               },
               {
                  id: "INVALID_DATE_TIMES_FORM",
                  name: "alfresco/forms/Form",
                  config: {
                     okButtonPublishTopic: "INVALID_DATE_TIMES_FORM_SUBMIT",
                     widgets: [
                        {
                           id: "LETTERS_DATE_TIME_VALUE",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              name: "lettersDateTime",
                              value: "letters",
                              label: "Letters datetime (mandatory)",
                              description: "Preset with the value \"letters\"",
                              requirementConfig: {
                                 initialValue: true
                              }
                           }
                        },
                        {
                           id: "EMPTY_DATE_TIME_VALUE",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              name: "emptyDateTime",
                              value: "",
                              label: "Empty datetime",
                              description: "Preset with the value \"\""
                           }
                        },
                        {
                           id: "NULL_DATE_TIME_VALUE",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              name: "nullDateTime",
                              value: null,
                              label: "Null datetime",
                              description: "Preset with the value null"
                           }
                        },
                        {
                           id: "UNDEFINED_DATE_TIME_VALUE",
                           name: "alfresco/forms/controls/DateTimeTextBox",
                           config: {
                              name: "undefinedDateTime",
                              value: undefined,
                              label: "Undefined datetime",
                              description: "Preset with the value undefined"
                           }
                        }
                     ]
                  }
               }
            ]
         }
      },
      {
         name: "alfresco/logging/DebugLog"
      }
   ]
};