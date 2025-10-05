//Import Babel library
import * as Babel from "@babel/standalone";

// This will allow me to run babel inside the browser
// No build setup needed

// Function to Convert JSX to JS
// JSX will be in form of string
export function convertJSXtoObject(code) {
  const trasnformedObject = Babel.transform(code, {
    // need a custom plugins to change JSX code
    // JSX gets combiled using createElement to convert them into Virtual DOM object
    // So I need a pluggin that do the same (babel plugin)
    // @babel/plugin-transform-react-jsx => Used by babel to represent UI as plain JS objects
    plugins: ["@babel/plugin-transform-react-jsx"],
  });
  console.log(trasnformedObject);

  return trasnformedObject.code;
}
