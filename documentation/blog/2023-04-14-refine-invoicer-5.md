---
title: Adding PDF Renderer
description: We are going to add PDF renderer to our PDF Invoice Generator app that we have been building last few days. This is also where we summarize our accomplishments and wrap up the series.
slug: refine-react-invoice-generator-5
authors: abdullah_numan
category: "How To Build"
tags: [react, refine-week]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-14-refine-invoicer-5/social.png
hide_table_of_contents: false
---

In this post, we add pdf renderer to **PDF Invoice Generator** app that we have been building last few days. This is also where we summarize our accomplishments and wrap up the series.

This is Day 5, the final day of the running [**#RefineWeek**](https://refine.dev/core/week-of-refine-strapi/) series and this [**#RefineWeek**](https://refine.dev/core/week-of-refine-strapi/) is a five-part tutorial that aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with [**Strapi**](https://strapi.io/) within a week.

### RefineWeek ft. Strapi series

- Day 1 - [Pilot & Refine architecture](https://refine.dev/blog/refine-react-invoice-generator-1/)
- Day 2 - [Setting Up the Invoicer App](https://refine.dev/blog/refine-react-invoice-generator-2/)
- Day 3 - [Adding CRUD Actions & Views](https://refine.dev/blog/refine-react-invoice-generator-3/)
- Day 4 - [Creating Mission and Invoices Pages](https://refine.dev/blog/refine-react-invoice-generator-4/)

[👉 The live version of the app is be available here.](https://invoice-generator.refine.dev/)

[👉 The final apps source code is available on GitHub.](https://github.com/refinedev/refine/tree/main/examples/refine-week-invoice-generator)

## Overview

Over the last two episodes, we have implemented CRUD operations on several resources of our **PDF Invoice Generator** app. On the way, we have explored `dataProvider`, `authProvider`, `resources`, `routerProvider` and their corresponding hooks that give **Refine** powerful tools to rapidly build data heavy applications. We became familiar with some sophisticated hooks such as `useSimpleList()`, `useModalForm()` and `useDrawerForm()` that makes building with **Refine** a convenience many developers seek.

In this article, we come past the **Refine** features and add a pdf renderer to display our invoices in a PDF screen.

We are going to add the pdf renderer inside a modal and make it accessible from the invoices `list` page at `/invoices`.

Let's get it done!

## Adding PDF Renderer

We are going to render an `invoices` record data inside a pdf layout. We are using `@react-pdf/renderer` `npm` package as our pdf renderer. So let's go ahead and install the package first:

```npm
npm install @react-pdf --save
```

### React PDF Layout

And build the PDF layout component like this:

<details>
<summary>Show PDFlayout code</summary>
<p>

```tsx title="src/components/pd/pdfLayout.tsx"
import {
  Document,
  Image,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import { IInvoice } from "interfaces";
import { API_URL } from "../../constants";

type PdfProps = {
  record: IInvoice | undefined;
};

export const PdfLayout: React.FC<PdfProps> = ({ record }) => {
  const subtotal =
    record?.missions.reduce((prev, cur) => {
      return prev + cur?.day * cur?.daily_rate;
    }, 0) ?? 0;

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4">
          <View>
            <Image
              src={API_URL + record?.company?.logo?.url}
              style={{ width: "120px", height: "auto" }}
            />
            <View style={styles.invoiceTextNumberContainer}>
              <Text
                style={styles.invoiceText}
              >{`Invoice: Invoice_#${record?.id}${record?.name}`}</Text>
              <Text
                style={styles.invoiceId}
              >{`Invoice ID: INVOICE_#${record?.id}`}</Text>
            </View>
          </View>
          <View style={styles.dividerLG} />

          <View style={styles.invoiceForFromContainer}>
            <View style={styles.invoiceFor}>
              <Text style={styles.invoiceForFromTitle}>invoice For:</Text>
              <View>
                <Text style={styles.invoiceForFromText}>
                  {record?.contact?.client?.name}
                </Text>
                <Text style={styles.invoiceForFromText}>
                  {record?.contact?.first_name}
                </Text>
                <Text style={styles.invoiceForFromText}>
                  {record?.contact?.last_name}
                </Text>
                <Text style={styles.invoiceForFromText}>
                  {record?.contact?.email}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceFrom}>
              <Text style={styles.invoiceForFromTitle}>From:</Text>
              <View>
                <Text style={styles.invoiceForFromText}>
                  {record?.company.name}
                </Text>
                <Text style={styles.invoiceForFromText}>
                  {record?.company.city}
                </Text>
                <Text style={styles.invoiceForFromText}>
                  {record?.company.address}, {record?.company.country}
                </Text>
              </View>
              <View style={styles.dividerSM} />
              <View>
                <Text
                  style={styles.invoiceForFromText}
                >{`Invoice ID: ${record?.id}`}</Text>
                <Text
                  style={styles.invoiceForFromText}
                >{`Invoice Custom ID: ${record?.custom_id}`}</Text>
                <Text
                  style={styles.invoiceForFromText}
                >{`Invoice Date: ${record?.date}`}</Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderItem, { width: "40%" }]}>
                Mission
              </Text>
              <Text style={[styles.tableHeaderItem, { width: "20%" }]}>
                Day
              </Text>
              <Text style={[styles.tableHeaderItem, { width: "20%" }]}>
                Day Rate
              </Text>
              <Text style={[styles.tableHeaderItem, { width: "20%" }]}>
                Total
              </Text>
            </View>
            {record?.missions.map((item) => {
              return (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCol, { width: "40%" }]}>
                    {item.mission}
                  </Text>
                  <Text style={[styles.tableCol, { width: "20%" }]}>
                    {item?.day}
                  </Text>
                  <Text style={[styles.tableCol, { width: "20%" }]}>
                    {item?.daily_rate}
                  </Text>
                  <Text style={[styles.tableCol, { width: "20%" }]}>
                    {item?.daily_rate * item?.day}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.signatureTotalContainer}>
            <View style={styles.signatureContainer}>
              <Text style={styles.signatureText}>
                Signature: ________________
              </Text>
              <Text style={styles.signatureText}>
                Date: {record?.date.toString()}
              </Text>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>SUBTOTAL: {subtotal}</Text>
              <Text style={styles.totalText}>
                Discount(%): {record?.discount}
              </Text>
              <Text style={styles.totalText}>Tax(%): {record?.tax}</Text>
              <Text style={styles.totalText}>
                Total($):
                {subtotal +
                  (subtotal * (record?.tax as number)) / 100 -
                  (subtotal * (record?.discount as number)) / 100}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{record?.company.city}</Text>
            <Text style={styles.footerText}>
              {record?.company.address}, {record?.company.country}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  viewer: {
    paddingTop: 32,
    width: "100%",
    height: "80vh",
    border: "none",
  },
  page: {
    display: "flex",
    padding: "0.4in 0.4in",
    fontSize: 12,
    color: "#333",
    backgroundColor: "#fff",
  },
  invoiceTextNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invoiceText: {
    color: "#3aabf0",
  },
  invoiceId: {
    textAlign: "center",
  },
  invoiceForFromContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceForFromTitle: {
    marginBottom: 24,
  },
  invoiceFor: {
    flex: 1.5,
  },
  invoiceFrom: {
    flex: 1,
  },
  invoiceForFromText: {
    color: "#787878",
    lineHeight: 1.5,
  },
  dividerSM: {
    width: "100%",
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#e5e5e5",
  },
  dividerLG: {
    width: "100%",
    height: 1,
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: "#e5e5e5",
  },
  table: {
    marginTop: 32,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  tableHeaderItem: {
    paddingVertical: 8,
    border: "1px solid #000",
    borderBottom: "none",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCol: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    border: "1px solid #000",
  },
  signatureTotalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  signatureContainer: {},
  totalContainer: {},
  signatureText: {
    marginTop: 32,
  },
  totalText: {
    marginTop: 16,
  },
  footer: {
    borderTop: "1px solid #e5e5e5",
    paddingTop: 8,
    marginTop: "auto",
  },
  footerText: {
    color: "#787878",
    lineHeight: 1.5,
  },
});
```

</p>
</details>

Everything here is React-PDF stuff so we won't be delving into any of the components here. However, if you are interested in exploring what's happening, please feel free to check out the cool [`@react-pdf/renderer` docs here](https://react-pdf.org/components).

### Displaying PDF Renderer in Refine Modal

As implemented on [Day 4](https://refine.dev/blog/refine-react-invoice-generator-4/), our `invoices` `list` page renders the `<InvoiceList />` component, which displays invoice data in rows of a table.

We are going to display a button on each row which, when clicked, opens up a modal. The modal will show the pdf document created from the invoice record.

Here's the updated `<InvoiceList />` component:

<details>
<summary>Show InvoiceList.tsx code</summary>
<p>

```tsx title="src/pages/invoices/list.tsx"
import { useState } from "react";
import { useModal } from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  TagField,
  EmailField,
  DeleteButton,
  EditButton,
} from "@refinedev/antd";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import { Table, Space, Button, Modal } from "antd";

import { IInvoice, IMission } from "interfaces";
import { PdfLayout } from "components/pdf";

const { FilePdfOutlined } = Icons;

export const InvoiceList: React.FC = () => {
  const [record, setRecord] = useState<IInvoice>();

  const { tableProps } = useTable<IInvoice>({
    meta: {
      populate: {
        contact: { populate: ["client"] },
        company: { populate: ["logo"] },
        missions: "*",
      },
    },
  });

  const { show, visible, close } = useModal();

  return (
    <>
      <List>
        <Table {...tableProps}>
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column<IInvoice>
            dataIndex="name"
            title="Invoice Name"
            render={(_, record) => {
              return `Invoice_#${record.id}${record?.name}`;
            }}
          />
          <Table.Column<IInvoice>
            dataIndex="date"
            title="Invoice Date"
            render={(value) => <DateField format="LL" value={value} />}
          />
          <Table.Column dataIndex={["company", "name"]} title="Company" />
          <Table.Column
            dataIndex={"missions"}
            title="Missions"
            render={(value) => {
              return value.map((item: IMission) => {
                return (
                  <TagField key={item?.id} color="blue" value={item?.mission} />
                );
              });
            }}
          />
          <Table.Column
            dataIndex="discount"
            title="Discount(%)"
            render={(value) => <TagField color="blue" value={value} />}
          />
          <Table.Column
            dataIndex="tax"
            title="Tax(%)"
            render={(value) => <TagField color="cyan" value={value} />}
          />
          <Table.Column dataIndex="custom_id" title="Custom Invoice ID" />

          <Table.Column
            dataIndex={["contact", "email"]}
            title="Contact"
            render={(value) => <EmailField value={value} />}
          />
          <Table.Column<IInvoice>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
              return (
                <Space>
                  <EditButton hideText size="small" recordItemId={record?.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record?.id}
                  />
                  {record.company && (
                    <Button
                      size="small"
                      icon={<FilePdfOutlined />}
                      onClick={() => {
                        setRecord(record);
                        show();
                      }}
                    />
                  )}
                </Space>
              );
            }}
          />
        </Table>
      </List>
      <Modal visible={visible} onCancel={close} width="80%" footer={null}>
        <PdfLayout record={record} />
      </Modal>
    </>
  );
};
```

</p>
</details>

With the amended code, we have added the `<FilePdfOutlined />` icon on each row under the `Actions` column, which is basically the button we need. The `<Modal />` component houses the `<PdfLayout />` which displays the pdf document for each invoice record loaded.

Do take note of the `meta.populate` property of the `useTable()` hook's argument object. Its nested, nasty. We can even get deeper collecting all associated collections. Basically, what we did was for each `invoices` record, populate all associated `contacts` with each of their associated `clients`; and populate all associated `companies` with each of their `logo`s; and also populate all associated `missions`.

OK. With this done, we can now go ahead and test our app and should be able to view the pdf document by clicking on the pdf document icon.

<img style={{alignSelf:"center"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-04-14-refine-invoicer-5/pdf.avif" alt="Generated PDF invoice preview" />

<br />

## Series Wrap Up

In this **#RefineWeek** series, we built a pdf invoice generator which allows users to create companies, add their clients, their contacts. They are also able to create missions with payment details such as daily rate and number of days for the mission to be completed, and issue invoices on those missions.

While building the app, we covered several core **Refine** concepts, particularly how data providers and hooks interact in data fetching and authentication. We made use of `dataProvider` and `authProvider` props, along with `resources` and `routerProvider`.

We also made distinction between **Refine** core modules and support packages such as the `@refinedev/strapi-4` which provides support to core features like `dataProvider` and `authProvider` with respect to communicating with the backend API.

We became familiar with the new `resources` and routing definitions in **Refine** version `v4`, where a particular resource item specifies the path to all its pages, instead of the exact component to render. The component to render is now specified in the route definitions, giving us more flexibility and control over defining a better routing system.

We delved into the details about the fantastic support **Refine** has for **Ant Design** components. We saw that **Refine** lets us use **Ant Design** components out of the box, but also has its own library of support package in `@refinedev/antd`. We experienced the convenience of powerful **refine-Ant Design** hooks such as `useSimpleList()`, `useModalForm()` and `useDrawerForm()` that handle tremendous amount of heavy tasks such as data fetching and state management. We explored the excruciating details of how **Refine** accomplishes these heavylifting in the background by digging into the source code of some of these hooks.

There are a lot more to **Refine** than what we have covered in this series. We have made great strides in covering these topics so far by going through the documentation, especially to understand the provider - hooks interactions.

We can always build on what we have covered so far. There are plenty of things that we can do moving forward, like implementing access control with the `accessControlProvider`, audit logging with the `auditLogProvider`, customizing the layout, header, auth pages, etc.

Please feel free to reach out to the Refine team or join the [Refine Discord Channel](https://discord.gg/refine) to learn more and / or contribute!
