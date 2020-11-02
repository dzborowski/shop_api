class RouteError extends Error {
  public status: number

  constructor(message: string, status: number) {
      super(message);

      this.status = status;
      Error.captureStackTrace(this, RouteError);
  }
}

export default RouteError;
