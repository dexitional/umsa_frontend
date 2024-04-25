import React, { useState } from 'react'
import PageTitle from '../../components/hrs/PageTitle'
import Service from '../../utils/hrsService'
import { redirect, useLoaderData } from 'react-router'
import ServiceListView from '../../components/nss/ServiceListView'
import { useUserStore } from '../../utils/authService'

type Props = {}
export async function action({ params }) {
  await Service.deleteService(params.roleId);
  return redirect("/hrs/nss/services");
}

export async function loader() {
  const data = await Service.fetchServices();
  return { data }
}

function PgNSSServices({}: Props) {
  const { data }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Service Requests" createtext="New" createlink="create" setView={()=> null} view={''} />
      <div className="">
        <ServiceListView data={data} />
      </div>
    </div>
  )
}

export default PgNSSServices