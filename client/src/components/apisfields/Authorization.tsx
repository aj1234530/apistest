import { useState } from "react";
type AuthType = "none" | "bearer" | "basicAuth" | "apiKey" | "awsSignature";

function AuthorizationComponent() {
  const [selectedValue, setSelectedValue] = useState<AuthType>("none");

  console.log(selectedValue);
  return (
    <div>
      <div>
        <div className="headingandselect flex flex row gap-3 text-sm">
          <span>Authorization Type</span>
          <select
            name="AuthorizationType"
            value={selectedValue}
            // Adding as AuthType tells TypeScript that this string will always be one of the defined options as the e.target.value is always typed as string
            onChange={(e) => setSelectedValue(e.target.value as AuthType)}
          >
            <option value="none">None</option>
            <option value="bearer">Bearer</option>
            <option value="basicAuth">Basic Auth</option>
            <option value="apiKey">API Key</option>
            <option value="awsSignature">AWS Signature</option>
          </select>
        </div>{" "}
        {selectedValue === "bearer" && (
          <div className="p-2 max-w-[800px]">
            <input
              placeholder="token"
              className="w-full p-2 border rounded-sm text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorizationComponent;
