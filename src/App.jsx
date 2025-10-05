import React, { useState } from "react";
import { convertJSXtoObject } from "./converter";
// import "./App.css";

// Custom react createElement funtion to replicate react.createElement functionality
// This function will retrun JS object (Vitual DOM object)
function custCreateElement(type, props, ...children) {
  // Children can be string/number/conditions/fragments.....
  // How to Handle this?
  //children will contain array of nested element need to flatten this
  // To get single level array
  // Also filter null or boolean value
  console.log("child before", children);
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
  const [jsxCode, setJsxCode] = useState(`      const name = "Utkarsh";
      const loggedIn = true;
      const items = ["Apple", "Banana", "Cherry"];

      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }

      <>
        <div>Hello, {name}!</div>
        <div>{loggedIn ? <h2>Welcome back!</h2> : <h2>Please sign in</h2>}</div>
        <ul>
          {items.map(item => <li>{item}</li>)}
        </ul>
        <Welcome name={name} />
        <div style={{ color: "blue", fontSize: "20px" }}>Styled Text</div>
      </>
    `);
  const styleMainContainer = {
    display: "flex",
    height: "100vh",
    padding: "20px",
    background: "#1e1e1e",
    color: "white",
  };

  const styleLeftPannel = {
    width: "50%",
    fontSize: "16px",
    padding: "10px",
    background: "#d4d4d4",
    color: "#252526",
    border: "none",
    outline: "none",
    resize: "none",
  };

  const styleRightPannel = {
    width: "50%",
    margin: 0,
    fontSize: "14px",
    padding: "10px",
    background: "#1e1e1e",
    color: "#c5e478",
    overflowY: "auto",
  };

  // Output Calculation Logic
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
  // eval() - > to evaluate a string code and convert it to JS code
  const result = eval(convertedJSX);

  // stringify the JS object into JSON string
  output = JSON.stringify(result, null, 2);
  // console.log("result", result);
  return (
    <>
      <div style={styleMainContainer}>
        <textarea
          value={jsxCode}
          onChange={(e) => setJsxCode(e.target.value)}
          style={styleLeftPannel}
        />

        {/* Right Panel */}
        <pre style={styleRightPannel}>{output}</pre>
      </div>
    </>
  );
}

export default App;
