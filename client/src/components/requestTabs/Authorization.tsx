import { useState } from "react";
type AuthType = "none" | "bearer" | "basicAuth" | "apiKey" | "awsSignature";

function AuthorizationComponent({
  authorizationData,
  setAuthorizationData,
  authSelectionValue,
  setAuthSelectionValue,
}: {
  authorizationData: string | null;
  setAuthorizationData: React.Dispatch<React.SetStateAction<string | null>>;
  authSelectionValue: AuthType;
  setAuthSelectionValue: React.Dispatch<React.SetStateAction<AuthType>>;
}) {
  console.log(authSelectionValue);
  return (
    <div>
      <div>
        <div className="headingandselect flex flex row gap-3 text-sm">
          <span>Authorization Type</span>
          <select
            name="AuthorizationType"
            value={authSelectionValue}
            // Adding as AuthType tells TypeScript that this string will always be one of the defined options as the e.target.value is always typed as string
            onChange={(e) => setAuthSelectionValue(e.target.value as AuthType)}
          >
            <option value="none">None</option>
            <option value="bearer">Bearer</option>
            <option value="basicAuth">Basic Auth</option>
            <option value="apiKey">API Key</option>
            <option value="awsSignature">AWS Signature</option>
          </select>
        </div>{" "}
        {authSelectionValue === "bearer" && (
          <div className="p-2 max-w-[800px]">
            <input
              placeholder="token"
              defaultValue={authorizationData || undefined}
              className="w-full p-2 border rounded-sm text-sm"
              onChange={(e) => setAuthorizationData(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorizationComponent;
