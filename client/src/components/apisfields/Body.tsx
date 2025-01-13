function BodyComponent() {
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
          placeholder="Raw Request Body"
          rows={8}
          cols={50}
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
