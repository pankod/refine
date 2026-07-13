import gql from "graphql-tag";

export const DASHBOARD_DEALS_CHART_QUERY = gql`
  query DashboardDealsChart(
    $filter: DealStageFilter!
    $sorting: [DealStageSort!]
    $paging: OffsetPaging
  ) {
    dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        title
        dealsAggregate {
          groupBy {
            closeDateMonth
            closeDateYear
          }
          sum {
            value
          }
        }
      }
      totalCount
    }
  }
`;
