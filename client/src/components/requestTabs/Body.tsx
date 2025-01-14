function BodyComponent({
  bodyData,
  setBodyData,
}: {
  bodyData: null | string;
  setBodyData: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  // let jsonData;
  // if(bodyData)
  //   jsonData = JSON.parse(bodyData)

  return (
    <div>
      <div className="headingandselect flex flex row gap-3 text-sm">
        <span>Content Type</span>
        <select name="contentType">
          <option value="none">None</option>
          <option value="application/json">application/json</option>
          <option value="application/xml">application/xml</option>
          <option value="text/xml">application/json</option>
        </select>
      </div>
      <div className="p-2 text-sm">
        {/* we can use json.parse to check if correct format is enter - it successfykt parses if json else error */}
        <textarea
          text-sm
          className="p-2"
          placeholder="enter in json format"
          rows={8}
          cols={50}
          defaultValue={bodyData || ""}
          onChange={(e) => setBodyData(e.target.value.replace(/\n/g, ""))}
        ></textarea>
      </div>
    </div>
  );
}

export default BodyComponent;
//consider
//1. dropdown for content sel
//2. very format and show red mark eg - json
//
