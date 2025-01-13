import { FormEvent, useState } from "react";
function KeyValue() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submitting");
  };
  return (
    <form
      key={"d"}
      className="flex flex-row pt-2 gap-2"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="key"
        onChange={(e) => setKey(e.target.value)}
        required
      ></input>
      <input
        placeholder="value"
        onChange={(e) => setValue(e.target.value)}
        required
      ></input>
      <input
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <div className="space-x-2 text-sm">
        <button className="border rounded p-2" type="submit">
          Set
        </button>
        {/* <button className="border rounded p-2">Delete</button> */}
      </div>
    </form>
  );
}

export default KeyValue;
