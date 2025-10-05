import { useState } from "react";
import { convertJSXtoObject } from "./converter";
// import "./App.css";

// Custom react createElement funtion to replicate react.createElement functionality
// This function will retrun JS object (Vitual DOM object)
function custCreateElement(type, props, children) {
  return {
    type,
    props: {
      ...props, // id,className, other attributes

      // children can contain another elements
      // div parent -> <p></p>
      // convert each children
      children: children,
    },
  };
}
function App() {
  // Default JSX code shown initially
  const [jsxCode, setJsxCode] = useState(`<div id="root">
  <h1>JSX Code </h1>
  <p>Default JSX template</p>
</div>
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

  return (
    <>
      <div style={styleMainContainer}>
        <textarea value={jsxCode} style={styleLeftPannel} />

        {/* Right Panel */}
        <pre style={styleRightPannel}></pre>
      </div>
    </>
  );
}

export default App;
