"use client";

import { getEnvironment } from "@/relay/environment";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useMemo } from "react";
import { ReactRelayContext } from "react-relay";

const Providers = ({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: RequestCookie[];
}) => {
  const environment = useMemo(() => getEnvironment({ cookies }), [cookies]);

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      {children}
    </ReactRelayContext.Provider>
  );
};

export default Providers;
