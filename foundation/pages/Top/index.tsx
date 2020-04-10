import React from "react";
import { RouteActionContext, RouteActionPayload } from "../../routing/types";
import { Link } from "../../components/atoms/Link";

export async function action({}: RouteActionContext): Promise<
  RouteActionPayload
> {
  return {
    content: (
      <div>
        <h1>Top</h1>
        <Link href="/second">/second</Link>
      </div>
    ),
  };
}