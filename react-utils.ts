/// <reference path="./typings/browser.d.ts" />

import * as react from "react";
import * as dom from "react-dom";
import {has} from "lodash";

/**
 * Creates and returns an empty React DOM container for a given type of element. 
 * Unfortunately necessary because some WinJS components must be a child of the body.
 */
export function GetReactDomContainer(selector: string)
{
    if(! document.querySelector("#react-container > #" + selector))
    {
        let container = document.createElement("div");
        container.id = selector;
        
        document.querySelector("#react-container").appendChild(container);
    }
    
    return document.querySelector("#react-container > #" + selector);
}

/**
 * Renders the given React component into a DOM container based on its name. Useful
 * when the component must be a direct child of the body.
 */
export function RenderReactComponent<T>(component: react.ReactElement<T> )
{
    const name = component.type["name"] || component.type["displayName"];    
    const rendered = dom.render(component, GetReactDomContainer(name));
    
    return rendered;
}

/**
 * Renders the given ReactWinJS control into a DOM container based on its name. Returns both the
 * React component and WinControl.
 */
export function RenderReactWinJSControl<ReactType, WinJSType>(component: JSX.Element)
{
    let name = component.type["name"] || component.type["displayName"];
    let rendered = dom.render(component, GetReactDomContainer(name)) as any as {refs: string[]};
    
    if(! has(rendered, "winControl") && ! has(rendered, "refs.control.winControl"))
    {
        console.warn(`WARNING: The React Component '${name}' passed to Utils.RenderReactWinJSControl must be a WinJS control, or must have a direct ref named 'control' that is a WinJS control.`)
    }
    
    let control = (rendered.refs["control"] && rendered.refs["control"]["winControl"] || rendered["winControl"]) as WinJSType;
    
    return {
        Component: rendered as any as ReactType,
        WinControl: control
    };
}