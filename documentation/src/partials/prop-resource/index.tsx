import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  method: {
    name: string;
    URL: string;
  };
  hook: {
    name: string;
    URL: string;
  };
  hasDefault?: boolean;
};

const PropResource: React.FC<Props> = ({ hook, method, hasDefault = true }) => {
  const md = `It will be passed to the [\`${method?.name}\`](${method?.URL}) method from the \`dataProvider\` as parameter via the [\`${hook?.name}\`](${hook?.URL}) hook. 
    The parameter is usually used as an API endpoint path.
    It all depends on how to handle the \`resource\` in the [\`${method?.name}\`](${method?.URL}) method. 
    See the [creating a data provider](/core/docs/data/data-provider/#creating-a-data-provider) section for an example of how resources are handled.`;

  return (
    <>
      {hasDefault && (
        <ReactMarkdown>
          &gt; Default: It reads the `resource` value from the current URL.
        </ReactMarkdown>
      )}
      <ReactMarkdown>{md}</ReactMarkdown>
    </>
  );
};

export default PropResource;
