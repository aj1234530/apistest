import { FormEvent, useRef, useState } from "react";
import type { Parameters } from "../Request"; //importing types
import KeyValue from "../KeyValue";
//approach - using useRef we can append child to the the container ,//if we use useState we can store the elements in the state and render it
function ParametersComponent() {
  //i asked gpt , way to add html to dom on button click,, use state and render
  const [parameterElements, setParameterElement] = useState<JSX.Element[]>([]);

  const addNewParameterSkeleton = () => {
    console.log(parameterElements.length);
    //dynamically injecting a component to dom
    const newElement = <KeyValue />;
    setParameterElement([...parameterElements, newElement]);
  };

  return (
    <div className="max-w-[1000px]">
      <div className=" flex flex-row gap-10 ">
        <p className="text-sm">Querey Parameters</p>
        <button
          className="text-sm border rounded px-2"
          onClick={() => addNewParameterSkeleton()}
        >
          Add
        </button>
      </div>
      <div className="container">{parameterElements.map((el) => el)}</div>{" "}
    </div>
  );
}

export default ParametersComponent;
