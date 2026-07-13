import React from "react";
import Head from "@docusaurus/Head";
import { TemplatesDetail } from "../../refine-theme/template-detail";

const TemplatesDetailPage = (props) => {
  const { content } = props;

  return (
    <>
      <Head title={`${content.title} Template | Refine`}>
        <html data-page="templates_refine" />
        <title>{content.title}</title>
        <meta property="og:title" content={content.title} />
        <meta
          name="description"
          content={`${content.title} Template | Refine`}
        />
        <meta
          property="og:description"
          content={`${content.description} Template | Refine`}
        />
        <meta data-rh="true" property="og:image" content={content.images[0]} />
        <meta data-rh="true" name="twitter:image" content={content.images[0]} />
      </Head>
      <TemplatesDetail data={content} />
    </>
  );
};

export default TemplatesDetailPage;
