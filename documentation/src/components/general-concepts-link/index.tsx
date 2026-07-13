import Admonition from "@theme/Admonition";
import React from "react";
import ReactMarkdown from "react-markdown";

const md = `
All the data related hooks (useTable, useForm, useList etc.) of Refine can be given some common properties like \`resource\`, \`meta\` etc.

For more information, refer to the [General Concepts documentation](/core/docs/guides-concepts/general-concepts/).
`;

const GeneralConceptsLink = () => {
  return (
    <div>
      <Admonition type="simple" title="Good to know">
        <ReactMarkdown>{md}</ReactMarkdown>
      </Admonition>
    </div>
  );
};

export default GeneralConceptsLink;
