// just put the string there of the response text
//the thing that was in  res.send or res.json i.e. res.data of axios
import React from "react";

//accepting only the apiResponseBody as
function RawTab({ apiResponseBody }: { apiResponseBody: string | null }) {
  return (
    <div className="h-[100vh] bg-gray-100">
      <p className=" p-2 ">{apiResponseBody}</p>
    </div>
  );
}

export default RawTab;
