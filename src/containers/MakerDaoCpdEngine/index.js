import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import CdpEngineDetail from './CdpEngineDetail'

const cdpEngineDetailFragment = gql`
  fragment CdpEngineDetail on CdpEngine {
    id
    cdpCount
    openCdpCount
    totalCollateral
    totalDebt
    lastBlock
    lastModifiedDate
    cdpOwners
  }
`

const CDP_ENGINE_QUERY = gql`
  {
    cdpEngine(id: "0x0") {
      ...CdpEngineDetail
    }
  }
  ${cdpEngineDetailFragment}
`

const CDP_ENGINE_SUBSCRIPTION = gql`
  subscription {
    cdpEngine(id: "0x0") {
      ...CdpEngineDetail
    }
  }
  ${cdpEngineDetailFragment}
`
function MakerDaoCdpEngine() {
  const { subscribeToMore, ...result } = useQuery(CDP_ENGINE_QUERY)

  if (result.loading) {
    return 'loading...'
  }

  if (result.error) {
    return 'ERROR: There was an error trying to fetch data!'
  }

  return (
    <CdpEngineDetail
      data={result.data.cdpEngine}
      subscribeToChanges={() =>
        subscribeToMore({
          document: CDP_ENGINE_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => (subscriptionData.data ? subscriptionData.data : prev),
        })
      }
    />
  )
}

export default MakerDaoCdpEngine
