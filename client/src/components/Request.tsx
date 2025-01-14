import { useState } from "react";
import ParametersComponent from "./requestTabs/Parameters";
import BodyComponent from "./requestTabs/Body";
import AuthorizationComponent from "./requestTabs/Authorization";
import HeadersComponent from "./requestTabs/Headers";
import axios from "axios";
import { ResponseTypes } from "../pages/RestAPI";
export interface Parameters {
  key: string;
  value: string;
  description: string | null;
}
type AuthType = "none" | "bearer" | "basicAuth" | "apiKey" | "awsSignature";
interface RequestComponentProps {
  apiResponse: ResponseTypes | null;
  setApiResponse: React.Dispatch<React.SetStateAction<ResponseTypes | null>>;
}
function Request({ apiResponse, setApiResponse }: RequestComponentProps) {
  const [method, setMethod] = useState<string>("GET");
  const [authorizationData, setAuthorizationData] = useState<null | string>(
    null
  ); //data that user enters in auth
  const [bodyData, setBodyData] = useState<string | null>(null); //data that user enters in body as json(only json will be impl)
  const [api, setApi] = useState<null | string>(null);
  const [parameters, setParameters] = useState<Parameters[] | null>(null);
  const [authSelectionValue, setAuthSelectionValue] =
    useState<AuthType>("none"); //for setting type of auth select

  //only four string values
  const [activeComponent, setActiveComponent] = useState<
    "Headers" | "Parameters" | "Authorization" | "Body"
  >("Parameters");

  const hanldeApiTesting = async () => {
    try {
      console.log(
        api,
        method,
        "body:",
        bodyData,
        "authorization",
        authorizationData,
        parameters
      ); //log
      if (bodyData) {
        //if not json string it throws syntax error - so catching the error in the catch
        JSON.parse(bodyData);
      }

      if (api && method) {
        console.log(api);
        console.log(bodyData);
        const response = await axios.post(
          `http://localhost:3002/${method}/${encodeURIComponent(api)}`,
          {
            bodyData: bodyData,
            authorizationData: authorizationData,
          }
        );
        console.log(response);
        setApiResponse((prev) => ({
          ...prev,
          responseSize: response.data.responseForTesters?.responseSize || "0",
          // stringy response
          responseBody: JSON.stringify(
            response.data.responseForTesters?.response || null
          ),
          status: response.data.responseForTesters.status,
          timeTaken: response.data.responseForTesters.timeTaken,
        }));
      } else {
        alert("check your inputs");
      }
    } catch (error) {
      alert(`invalid json format ${error}`);
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <div className="display flex flex-row gap-2 p-1">
          <div className="flex flex-row border rounded w-[500px]">
            <select
              className="w-1/5"
              name="typeOfMethod"
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              id="first_name"
              className="w-4/5 bg-gray-50  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="enter your api"
              onChange={(e) => setApi(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={hanldeApiTesting}
          >
            Send
          </button>
        </div>
      </form>
      <div className="flex flex-row justify-between max-w-[800px] text-sm p-2">
        <button
          onClick={() => setActiveComponent("Headers")}
          className={`${activeComponent === "Headers" && "underline"}`}
        >
          Headers
        </button>
        <button
          onClick={() => setActiveComponent("Parameters")}
          className={`${activeComponent === "Parameters" && "underline"}`}
        >
          Parameters
        </button>
        <button
          onClick={() => setActiveComponent("Body")}
          className={`${activeComponent === "Body" && "underline"}`}
        >
          Body
        </button>
        <button
          onClick={() => setActiveComponent("Authorization")}
          className={`${activeComponent === "Authorization" && "underline"}`}
        >
          Authorization
        </button>
      </div>
      <hr></hr>
      <div className="p-2">
        {/* asked gpt how to render four component in single space one by one */}
        {activeComponent === "Parameters" && <ParametersComponent />}
        {activeComponent === "Body" && (
          <BodyComponent bodyData={bodyData} setBodyData={setBodyData} />
        )}
        {activeComponent === "Authorization" && (
          <AuthorizationComponent
            authSelectionValue={authSelectionValue}
            setAuthSelectionValue={setAuthSelectionValue}
            authorizationData={authorizationData}
            setAuthorizationData={setAuthorizationData}
          />
        )}
        {activeComponent === "Headers" && <HeadersComponent />}
      </div>
    </div>
  );
}

export default Request;
