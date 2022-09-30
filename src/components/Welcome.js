import { Card, Page } from '@shopify/polaris'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Welocme() {
    
  return (
    <Page title='Dahboard'>
      <Card>
        <NavLink to={'/grid'} style={{ fontSize: "1.4rem", fontWeight: "800" }}>Grid </NavLink>
      </Card>
    </Page>
  )
}

export default Welocme