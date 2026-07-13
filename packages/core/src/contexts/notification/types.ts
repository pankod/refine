export type SuccessErrorNotification<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
> = {
  /**
     * Success notification configuration to be displayed when the mutation is successful.
     * @default '"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code: statusCode)"'

     */
  successNotification?:
    | OpenNotificationParams
    | false
    | ((
        data?: TData,
        values?: TVariables,
        resource?: string,
      ) => OpenNotificationParams | false | undefined);
  /**
   * Error notification configuration to be displayed when the mutation fails.
   * @default '"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code: statusCode)"'
   */
  errorNotification?:
    | OpenNotificationParams
    | false
    | ((
        error?: TError,
        values?: TVariables,
        resource?: string,
      ) => OpenNotificationParams | false | undefined);
};

export type OpenNotificationParams = {
  key?: string;
  message: string;
  type: "success" | "error" | "progress";
  description?: string;
  cancelMutation?: () => void;
  undoableTimeout?: number;
};

export interface INotificationContext {
  open?: (params: OpenNotificationParams) => void;
  close?: (key: string) => void;
}

export type NotificationProvider = Required<INotificationContext>;
