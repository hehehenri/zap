"use client";

import { getEnvironment } from "@/relay/environment";
import { useMemo } from "react";
import { ReactRelayContext } from "react-relay";
import Cookies from "js-cookie";

const Providers = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) => {
  const environment = useMemo(() => getEnvironment({ token }), [token]);

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      {children}
    </ReactRelayContext.Provider>
  );
};

export default Providers;
