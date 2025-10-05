//Import Babel library
import * as Babel from "@babel/standalone";

// This will allow me to run babel inside the browser
// No build setup needed

// Function to Convert JSX to JS
// JSX will be in form of string
export function convertJSXtoObject(code) {
  console.log(code);
  const trasnformedObject = Babel.transform(code, {
    // This will automatically contain JSX tranform feature
    // It tells babel how to process file containing JSX
    // So we dont need plugins "@babel/plugin-transform-react-jsx"
    // pragma specifies which function to use for element creation
    presets: ["react"],
    // pragma specifies which function to use for element creation
    plugins: [["transform-react-jsx", { pragma: "custCreateElement" }]],
  });
  console.log(trasnformedObject);
  console.log(trasnformedObject.code);

  return trasnformedObject.code;
}

// ******************** Initial Logic to Transform the JSX code using Pluggins **************
//  {
//   const trasnformedObject = Babel.transform(code, {
//     // need a custom plugins to change JSX code
//     // JSX gets combiled using createElement to convert them into Virtual DOM object
//     // So I need a pluggin that do the same (babel plugin)
//     // @babel/plugin-transform-react-jsx => Used by babel to represent UI as plain JS objects
//     plugins: ["@babel/plugin-transform-react-jsx"],
//   });

// console.log(trasnformedObject);

//   return trasnformedObject.code;
