import { useState } from "react";
import Request from "../components/Request";
import RawTab from "../components/responseTabs/Raw";
// showing all in string
export interface ResponseTypes {
  status: string;
  responseBody: string | null;
  timeTaken: string;
  responseSize: string;
}

function RestAPI() {
  //data that user enters in auth
  const [bodyData, setBodyData] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<null | ResponseTypes>(null);
  const [activeComponent, setActiveComponent] = useState<
    "JSON" | "Raw" | "Headers"
  >("Raw");
  return (
    <div>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <nav className="bg-blue-800 h-12 w-full"></nav>
        <div className="w-full flex flex-row">
          <aside className="bg-blue-100 min-w-12 h-[calc(100vh-3rem)] "></aside>
          <div className="w-[calc(100%-3rem-300px)] h-[calc(100vh-3rem)]">
            <div className="w-full h-12 bg-white flex flex-row overflow-auto">
              {/* tab feature  */}
              <span className="h-full border">Tab 1</span>
              <span className="h-full border">Tab 2</span>
              <span className="h-full border">Tab 3</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
              <span className="h-full border">Tab 4</span>
            </div>
            <main className="bg-blue-50 w-full h-[calc(100vh-6rem)] flex flex-col">
              <div className="w-full h-full overflow-auto">
                <Request
                  apiResponse={apiResponse}
                  setApiResponse={setApiResponse}
                />
              </div>
              <div className="w-full h-full  overflow-auto border ">
                {apiResponse ? (
                  <div>
                    <div className="response-metadata-strip flex flex-row gap-3 text-sm">
                      <div className="flex flex-row ">
                        Status:
                        <span
                          className={`${
                            parseInt(apiResponse.status) >= 300
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {apiResponse.status}
                        </span>
                      </div>
                      <div className="flex flex-row">
                        Time:
                        <span className="border rounded px-2">
                          {apiResponse.timeTaken}s
                        </span>
                      </div>
                      <div className="flex flex-row">
                        Size:
                        <span className="border rounded px-2">
                          {apiResponse.responseSize}B
                        </span>
                      </div>
                    </div>
                    <div className="response-cards flex flex-row justify-between max-w-[800px] text-sm p-2">
                      <button
                        onClick={() => setActiveComponent("JSON")}
                        className={`${
                          activeComponent === "JSON" && "underline"
                        } `}
                      >
                        JSON
                      </button>
                      <button
                        onClick={() => setActiveComponent("Raw")}
                        className={`${
                          activeComponent === "Raw" && "underline"
                        } `}
                      >
                        Raw
                      </button>
                      <button
                        onClick={() => setActiveComponent("Headers")}
                        className={`${
                          activeComponent === "Headers" && "underline"
                        } `}
                      >
                        Headers
                      </button>
                    </div>
                    <hr></hr>
                    {activeComponent === "Raw" && (
                      <RawTab apiResponseBody={apiResponse.responseBody} />
                    )}
                  </div>
                ) : (
                  <div className="text-sm font-thin	">
                    Response will appear here
                  </div>
                )}
              </div>
              <div></div>
            </main>
          </div>
          <aside className="w-[300px] bg-white">
            {/* will trucatate the text or anything 48 px */}
            <div className="render-recent-requests flex flex-col truncate w-48  ">
              <span className="ellipsis">
                request 1
                requestrequestrequestrequestrequestrequestrequestrequestrequestrequestrequest
              </span>
              <span>request 1</span>
              <span>request 1</span>
              <span>request 1</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default RestAPI;
