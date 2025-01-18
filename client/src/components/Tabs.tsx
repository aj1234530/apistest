import RestAPI from "../pages/RestAPI";

function Tabs() {
  return (
    <div className="w-full h-12 bg-white flex flex-row  gap-2 overflow-auto">
      <div className="flex flex-row ">
        <span className=" border ">Tab 1</span>

        <span className=" border ">Tab 1</span>
        <span className=" border ">Tab 1</span>
        <span className=" border ">Tab 1</span>
        <span className=" border ">Tab 1</span>
      </div>
      <button>+</button>
    </div>
  );
}

export default Tabs;
