sap.ui.define(
    [
      "jquery.sap.global",
      "sap/ui/core/UIComponent",
      "sap/ui/model/json/JSONModel",
      "sap/f/FlexibleColumnLayoutSemanticHelper",
    ],
    function (
      jQuery,
      UIComponent,
      JSONModel,
      FlexibleColumnLayoutSemanticHelper
    ) {
      "use strict";
  
      var Component = UIComponent.extend("com.ibm.zcproduct01.Component", {
        metadata: {
          manifest: "json",
        },
  
        init: function () {
          UIComponent.prototype.init.apply(this, arguments);
  
          var oModel = new JSONModel();
          this.setModel(oModel);
  
          // set products demo model on this sample
          var oProductsModel = new JSONModel(
            sap.ui.require.toUrl("com/ibm/zcproduct01/mockdata") +
              "/products.json"
          );
          oProductsModel.setSizeLimit(1000);
          this.setModel(oProductsModel, "products");
  
          this.getRouter().initialize();
        },
  
        createContent: function () {
          return sap.ui.view({
            viewName: "com.ibm.zcproduct01.view.FlexibleColumnLayout",
            type: "XML",
          });
        },
  
        getHelper: function () {
          var oFCL = this.getRootControl().byId("fcl"),
            oParams = jQuery.sap.getUriParameters(),
            oSettings = {
              defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
              defaultThreeColumnLayoutType:
                sap.f.LayoutType.ThreeColumnsMidExpanded,
              mode: oParams.get("mode"),
              maxColumnsCount: oParams.get("max"),
            };
  
          return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
            oFCL,
            oSettings
          );
        },
      });
      return Component;
    },
    true
  );
  