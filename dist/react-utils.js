/// <reference path="./typings/browser.d.ts" />
"use strict";
var dom = require("react-dom");
var lodash_1 = require("lodash");
/**
 * Creates and returns an empty React DOM container for a given type of element.
 * Unfortunately necessary because some WinJS components must be a child of the body.
 */
function GetReactDomContainer(selector) {
    if (!document.querySelector("#react-container > #" + selector)) {
        var container = document.createElement("div");
        container.id = selector;
        document.querySelector("#react-container").appendChild(container);
    }
    return document.querySelector("#react-container > #" + selector);
}
exports.GetReactDomContainer = GetReactDomContainer;
/**
 * Renders the given React component into a DOM container based on its name. Useful
 * when the component must be a direct child of the body.
 */
function RenderReactComponent(component) {
    var name = component.type["name"] || component.type["displayName"];
    var rendered = dom.render(component, GetReactDomContainer(name));
    return rendered;
}
exports.RenderReactComponent = RenderReactComponent;
/**
 * Renders the given ReactWinJS control into a DOM container based on its name. Returns both the
 * React component and WinControl.
 */
function RenderReactWinJSControl(component) {
    var name = component.type["name"] || component.type["displayName"];
    var rendered = dom.render(component, GetReactDomContainer(name));
    if (!lodash_1.has(rendered, "winControl") && !lodash_1.has(rendered, "refs.control.winControl")) {
        console.warn("WARNING: The React Component '" + name + "' passed to Utils.RenderReactWinJSControl must be a WinJS control, or must have a direct ref named 'control' that is a WinJS control.");
    }
    var control = (rendered.refs["control"] && rendered.refs["control"]["winControl"] || rendered["winControl"]);
    return {
        Component: rendered,
        WinControl: control
    };
}
exports.RenderReactWinJSControl = RenderReactWinJSControl;
//# sourceMappingURL=react-utils.js.map