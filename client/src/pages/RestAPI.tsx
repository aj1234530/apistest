import { useEffect, useState } from "react";
import Request from "../components/Request";
import RawTab from "../components/responseTabs/Raw";
import axios from "axios";
import Tabs from "../components/Tabs";
// import Tabs from "../components/Tabs";
// showing all in string
export interface ResponseTypes {
  status: string;
  responseBody: string | null;
  timeTaken: string;
  responseSize: string;
}
interface requestType {
  id: string;
  apiEndpoint: string;
  method: string;
  bodyData: string | null;
  authorizationToken: string | null;
}
function RestAPI() {
  //data that user enters in auth
  const [bodyData, setBodyData] = useState<string | null>(null);
  const [updateUI, setUpdateUI] = useState(false);
  const [history, setHistory] = useState<requestType[]>();
  const [apiResponse, setApiResponse] = useState<null | ResponseTypes>(null);
  const [activeComponent, setActiveComponent] = useState<
    "JSON" | "Raw" | "Headers"
  >("Raw");
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const verfiyAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3002/api/v1/auth/verify",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setIsLogged(true);
          console.log("logged in");
        }
      } catch (error) {
        console.log("not logged in");
      }
    };
    //if the person is logged , then fetch their requests
    const fetchRequests = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3002/api/v1/user/fetchrequests",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setHistory(response.data.requests);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verfiyAuth(); //call the fxn
    fetchRequests();
  }, [updateUI]);
  return (
    <div>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <nav className="bg-blue-800 h-12 w-full flex justify-between items-center">
          {/* logo */}
          <div className="text-xl text-white">Logo</div>
          {/* account or login signup */}
          {isLogged ? (
            <div className="text-white p-2">My Profile </div>
          ) : (
            <div className="text-white flex flex-row gap-2">
              <div>Login</div>
              <div>Signup</div>
            </div>
          )}
        </nav>
        <div className="w-full flex flex-row">
          <aside className="bg-blue-100 min-w-12 h-[calc(100vh-3rem)] "></aside>
          <div className="w-[calc(100%-3rem-300px)] h-[calc(100vh-3rem)]">
            <Tabs />
            <main className="bg-blue-50 w-full h-[calc(100vh-6rem)] flex flex-col">
              <div className="w-full h-full overflow-auto">
                <Request
                  apiResponse={apiResponse}
                  setApiResponse={setApiResponse}
                  setUpdateUI={setUpdateUI}
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
          <aside className="max-w-[300px] bg-white  ">
            {/* will trucatate the text or anything 48 px  */}
            {history &&
              history.map((el) => (
                <div
                  className="render-recent-requests flex flex-col p-2 "
                  key={el.id}
                >
                  <div className="space-x-2 ">
                    <span className="text-xs">{el.method}</span>
                    <span>{el.apiEndpoint}</span>
                  </div>
                </div>
              ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default RestAPI;
