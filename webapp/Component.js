sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "caiplugin/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("caiplugin.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            // init: function () {
            //     // call the base component's init function
            //     UIComponent.prototype.init.apply(this, arguments);

            //     // enable routing
            //     this.getRouter().initialize();

            //     // set the device model
            //     this.setModel(models.createDeviceModel(), "device");
            // }
            

            init: function () {
                var rendererPromise = this._getRenderer();
                this.renderRecastChatbot();
            },
    
            renderRecastChatbot: function() {
                // if (!document.getElementById("cai-webchat")) {
                //     var s = document.createElement("script");
                //     s.setAttribute("id", "cai-webchat");
                //     s.setAttribute("src", "https://cdn.cai.tools.sap/webchat/webchat.js");
                //     document.body.appendChild(s);
                // }
                // s.setAttribute("channelId", "4b46a1f7-5644-41c9-9776-88ca8d956375");
                // s.setAttribute("token", "e7f212f780ddc0121d48f912632f442c");

                if (!document.getElementById("cai-webclient-custom")) {
                    var s = document.createElement("script");
                    s.setAttribute("src", "https://cdn.cai.tools.sap/webclient/bootstrap.js");
                    s.setAttribute("id", "cai-webclient-custom");
                    document.body.appendChild(s);
                }

                    s.setAttribute("data-channel-id", "2b07a0f4-2e8a-4216-a34d-8d0cc3b11513");
                    s.setAttribute("data-token", "6e671f1e122f6dd5852873f7888b9d7d");
                    s.setAttribute("data-expander-type", "CAI");
                    s.setAttribute("data-expander-preferences", "JTdCJTIyZXhwYW5kZXJMb2dvJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZjZG4uY2FpLnRvb2xzLnNhcCUyRndlYmNoYXQlMkZ3ZWJjaGF0LWxvZ28uc3ZnJTIyJTJDJTIyZXhwYW5kZXJUaXRsZSUyMiUzQSUyMkNsaWNrJTIwb24lMjBtZSElMjIlMkMlMjJvbmJvYXJkaW5nTWVzc2FnZSUyMiUzQSUyMkNoYXQlMjB3aXRoJTIwbWUhJTIyJTJDJTIyb3BlbmluZ1R5cGUlMjIlM0ElMjJuZXZlciUyMiUyQyUyMnRoZW1lJTIyJTNBJTIyREVGQVVMVCUyMiU3RA==");
                    
            }, 
    
         _getRenderer: function(){
                var that = this,
                // @ts-ignore
                oDeferred = new jQuery.Deferred(),
                oRenderer;
    
                // @ts-ignore
                that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
                if (!that._oShellContainer){
                    oDeferred.reject(
                        "Illegal State");
                    } else {
                        oRenderer = that._oShellContainer.getRenderer();
                        if (oRenderer){
                            oDeferred.resolve(oRenderer);
                        } else {
                            that._onRendererCreated = function(oEvent){
                                oRenderer = oEvent.getParameter("renderer");
                                if (oRenderer) {
                                    oDeferred.resolve(oRenderer);
                                } else {
                                    oDeferred.reject("Illegal State");
                                }
                            };
                            that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
                            }
                        }
                        return oDeferred.promise();
                        }   
        });
    }
);