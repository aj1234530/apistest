import { useState } from "react";
import KeyValue from "../KeyValue";

function HeadersComponent() {
  const [keyValueFields, setKeyValueFields] = useState<JSX.Element[]>([]);
  const addNewKeyValueField = () => {
    console.log(keyValueFields.length);
    //dynamically injecting a component to dom
    const newElement = <KeyValue />;
    setKeyValueFields([...keyValueFields, newElement]);
  };
  return (
    <div>
      <div className=" flex flex-row gap-10 ">
        <p className="text-sm"> Headers</p>
        <button
          className="text-sm border rounded px-2"
          onClick={() => addNewKeyValueField()}
        >
          Add
        </button>
      </div>
      <div className="container">{keyValueFields.map((el) => el)}</div>{" "}
    </div>
  );
}

export default HeadersComponent;
