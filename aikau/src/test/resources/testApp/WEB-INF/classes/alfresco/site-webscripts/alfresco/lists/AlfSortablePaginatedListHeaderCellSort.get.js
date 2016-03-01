var view = {
   name: "alfresco/lists/views/AlfListView",
   config: {
      widgetsForHeader : [
         {
            id : "HEADER_INDEX",
            name : "alfresco/lists/views/layouts/HeaderCell",
            config :
            {
               label : "Index",
               sortable : true,
               sortValue : "index"
            }
         }
      ],
      widgets: [
         {
            name: "alfresco/lists/views/layouts/Row",
            config: {
               widgets: [
                  {
                     name: "alfresco/lists/views/layouts/Cell",
                     config: {
                        widgets: [
                           {
                              name: "alfresco/renderers/Property",
                              config: {
                                 propertyToRender: "index"
                              }
                           }
                        ]
                     }
                  }
               ]
            }
         }
      ]
   }
};

model.jsonModel = {
   services: [
      {
         name: "alfresco/services/LoggingService",
         config: {
            loggingPreferences: {
               enabled: true,
               all: true,
               warn: true,
               error: true
            }
         }
      },
      {
         name: "aikauTesting/mockservices/PaginationService",
         config: {
            loadDataSubscriptionTopic: "ALF_RETRIEVE_DOCUMENTS_REQUEST"
         }
      },
      "alfresco/services/NavigationService"
   ],
   widgets: [
      {
         name: "alfresco/layout/HorizontalWidgets",
         config: {
            widgets: [
               {
                  id: "LIS_AREA",
                  name: "alfresco/layout/ClassicWindow",
                  config: {
                     title: "List Area",
                     pubSubScope: "LIST_AREA_",
                     widgets: [
                            {
                               id: "SORTABLE_LIST",
                               name: "alfresco/lists/AlfSortablePaginatedList",
                               config: {
                                  widgets: [view]
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