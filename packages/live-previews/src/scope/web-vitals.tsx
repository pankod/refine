/**
 * This is done to mock `web-vitals` as a no-op.
 */

const fn = () => undefined;

const ReportWebVitals = {
  ReportWebVitals: {
    default: fn,
  },
};

export default ReportWebVitals;
