import ora from "ora";

const spinner = async <T>(fn: () => Promise<T>, message: string) => {
  const spinner = ora({
    color: "cyan",
    text: message,
  }).start();
  const result = await fn();
  spinner.stop();
  return result;
};

export default spinner;
