import React, { useState } from "react";
import { convertJSXtoObject } from "./converter";

const REACT_ELEMENT_TYPE = Symbol.for("react.element");

// Custom react createElement funtion to replicate react.createElement functionality
// This function will retrun JS object (Vitual DOM object)
function custCreateElement(type, props, ...children) {
  // Children can be string/number/conditions/fragments.....
  // How to Handle this?
  //children will contain array of nested element need to flatten this
  // To get single level array
  // Also filter null or boolean value
  // console.log("child before", children);
  const flatChildren = children.flat();
  const normalizedChildren = flatChildren
    .map((child) => {
      if (child === null || child === undefined || typeof child === "boolean")
        return null;
      if (typeof child === "string" || typeof child === "number") return child;
      if (typeof child === "object") return child;
      return String(child);
    })
    .filter((c) => c !== null);

  // Since Props are immutable that is why creating a copy of it
  const finalProps = { ...props };

  if (normalizedChildren.length === 1) {
    finalProps.children = normalizedChildren[0];
  } else if (normalizedChildren.length > 1) {
    finalProps.children = normalizedChildren;
  }
  return { type, props: finalProps };
}
function App() {
  // Default JSX code shown initially
  const [jsxCode, setJsxCode] = useState(`
      const name = "Utkarsh";
      const loggedIn = true;
      const items = ["Apple", "Banana", "Cherry"];

      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }

      <div>
        <div>Hello, {name}!</div>
        <div>{loggedIn ? <h2>Welcome back!</h2> : <h2>Please sign in</h2>}</div>
        <ul>
          {items.map(item => <li>{item}</li>)}
        </ul>
        <Welcome name={name} />
        <div style={{ color: "blue", fontSize: "20px" }}>Styled Text</div>
      </div>
    `);

  // ********************** Styling the HTML Structure *****************

  const styleMainContainer = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#1e1e1e",
    color: "#fff",
  };

  const styleHeader = {
    padding: "20px",
    background: "#007acc",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  };

  const styleDescription = {
    padding: "10px 20px",
    background: "#333",
    color: "#c5e478",
    fontSize: "14px",
  };

  const styleContent = {
    display: "flex",
    flex: 1,
    padding: "20px",
    gap: "20px",
  };

  const stylePanelContainer = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const stylePanelLabel = {
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "16px",
  };

  const styleLeftPannel = {
    flex: 1,
    fontSize: "16px",
    padding: "10px",
    background: "#d4d4d4",
    color: "#252526",
    border: "none",
    outline: "none",
    resize: "none",
    borderRadius: "6px",
    fontFamily: "'Courier New', Courier, monospace",
  };

  const styleRightPannel = {
    flex: 1,
    fontSize: "14px",
    padding: "10px",
    background: "#1e1e1e",
    color: "#c5e478",
    overflowY: "auto",
    border: "1px solid #444",
    borderRadius: "6px",
    fontFamily: "'Courier New', Courier, monospace",
    margin: "0px",
  };

  const styleFooter = {
    padding: "10px 20px",
    textAlign: "center",
    background: "#007acc",
    color: "#fff",
    fontSize: "14px",
  };
  // ******************** Output Calculation Logic *****************

  // 1. User will type JSX in textarea
  // 2. that text need to be transformed by babel using convertJsxtoObject function
  // 3. This function will retrun JS string
  // 4. convert it into JS object
  // 5. print that object in JSON format

  // Convert JSX to JS using Babel
  const convertedJSX = convertJSXtoObject(jsxCode);

  // console.log("converted code", convertedJSX);
  // console.log(typeof convertedJSX);

  // data is in form of string
  // Need to convert it to JS object
  let output = "";

  try {
    // eval() - > to evaluate a string code and convert it to JS code
    const result = eval(convertedJSX);

    // stringify the JS object into JSON string
    output = JSON.stringify(result, null, 2);
    // console.log("result", result);
  } catch {
    output = "⚠️ Invalid JSX";
  }

  return (
    <div style={styleMainContainer}>
      <div style={styleHeader}>React Virtual DOM Visualizer</div>
      <div style={styleDescription}>
        Type your JSX code in the left panel. The right panel will display the
        equivalent React Virtual DOM object in JSON format.
      </div>
      <div style={styleContent}>
        {/* Left Panel */}
        <div style={stylePanelContainer}>
          <div style={stylePanelLabel}>JSX Code</div>
          <textarea
            value={jsxCode}
            onChange={(e) => setJsxCode(e.target.value)}
            style={styleLeftPannel}
          />
        </div>

        {/* Right Panel */}
        <div style={stylePanelContainer}>
          <div style={stylePanelLabel}>React Virtual DOM Object</div>
          <pre style={styleRightPannel}>{output}</pre>
        </div>
      </div>
      <div style={styleFooter}>© 2025 JSX Converter. All rights reserved.</div>
    </div>
  );
}

export default App;
