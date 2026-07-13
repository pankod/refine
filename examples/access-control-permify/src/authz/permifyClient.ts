import type { BaseKey } from "@refinedev/core";

export class PermifyClient {
  private instance: string;

  constructor(instance: string) {
    this.instance = instance;
  }

  async isAuthorized(
    user: string,
    resource: string,
    action: string,
    paramsId?: BaseKey | undefined,
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.instance}/v1/tenants/t1/permissions/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metadata: {
              depth: 5,
            },
            entity: {
              type: resource,
              id: paramsId?.toString(),
            },
            permission: action,
            subject: {
              type: "user",
              id: user, // user ID
            },
          }),
        },
      );

      const responseData = await response.json();
      return responseData?.can === "CHECK_RESULT_ALLOWED";
    } catch (error) {
      console.error("Error while authorizing:", error);
      return false; // or handle the error as needed
    }
  }
}
