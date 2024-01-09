"use client";

import { env } from "@/relay/env";
import { useMemo } from "react";
import { ReactRelayContext } from "react-relay";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const environment = useMemo(() => env(), []);

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      {children}
    </ReactRelayContext.Provider>
  );
};

export default Providers;
