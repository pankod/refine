import {
  Document,
  Image,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import type { IInvoice } from "interfaces";
import { API_URL } from "../../constants";

type PdfProps = {
  record: IInvoice | undefined;
};

export const PdfLayout: React.FC<PdfProps> = ({ record }) => {
  const subtotal =
    record?.missions.reduce((prev, cur) => {
      return prev + cur.day * cur.daily_rate;
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
            <View style={styles.inoviceTextNumberContainer}>
              <Text style={styles.inoviceText}>
                {`Invoice: Invoice_#${record?.id}${record?.name}`}
              </Text>
              <Text
                style={styles.inoviceId}
              >{`Invoice ID: INVOICE_#${record?.id}`}</Text>
            </View>
          </View>
          <View style={styles.dividerLG} />

          <View style={styles.inoviceForFromCotnainer}>
            <View style={styles.inoviceFor}>
              <Text style={styles.inoviceForFromTitle}>Inovice For:</Text>
              <View>
                <Text style={styles.inoviceForFromText}>
                  {record?.contact?.client?.name}
                </Text>
                <Text style={styles.inoviceForFromText}>
                  {record?.contact?.first_name}
                </Text>
                <Text style={styles.inoviceForFromText}>
                  {record?.contact?.last_name}
                </Text>
                <Text style={styles.inoviceForFromText}>
                  {record?.contact?.email}
                </Text>
              </View>
            </View>

            <View style={styles.inoviceFrom}>
              <Text style={styles.inoviceForFromTitle}>From:</Text>
              <View>
                <Text style={styles.inoviceForFromText}>
                  {record?.company.name}
                </Text>
                <Text style={styles.inoviceForFromText}>
                  {record?.company.city}
                </Text>
                <Text style={styles.inoviceForFromText}>
                  {record?.company.address}, {record?.company.country}
                </Text>
              </View>
              <View style={styles.dividerSM} />
              <View>
                <Text
                  style={styles.inoviceForFromText}
                >{`Invoice ID: ${record?.id}`}</Text>
                <Text
                  style={styles.inoviceForFromText}
                >{`Invoice Custom ID: ${record?.custom_id}`}</Text>
                <Text
                  style={styles.inoviceForFromText}
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
                    {item.day}
                  </Text>
                  <Text style={[styles.tableCol, { width: "20%" }]}>
                    {item.daily_rate}
                  </Text>
                  <Text style={[styles.tableCol, { width: "20%" }]}>
                    {item.daily_rate * item.day}
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
  inoviceTextNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inoviceText: {
    color: "#3aabf0",
  },
  inoviceId: {
    textAlign: "center",
  },
  inoviceForFromCotnainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inoviceForFromTitle: {
    marginBottom: 24,
  },
  inoviceFor: {
    flex: 1.5,
  },
  inoviceFrom: {
    flex: 1,
  },
  inoviceForFromText: {
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
