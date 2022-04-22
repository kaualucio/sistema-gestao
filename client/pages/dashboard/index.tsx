import { GetServerSideProps } from "next";
import { ReactElement, useContext, useEffect } from "react";
import { parseCookies } from 'nookies'
import Home from "../../components/DashboardPage/Home/Home";
import LayoutDashboard from "../../components/DashboardPage/LayoutDashboard/LayoutDashboard";
import { getApiClient } from "../../services/apiClient";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

interface DashboardProps {
  response: Record<string,string>
}
function Dashboard({response}: DashboardProps) {
  // const { user } = useContext(AuthContext)
  // console.log(user)
  // useEffect(() => {
  //   api.get(`/api/receipts/get-all/${user?.id}`)
  //     .then(({data}) => {
  //       console.log(data)
  //     })
  // }, [])

  return (
    <Home />
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      {page}
    </LayoutDashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['beru.access_token']: token, ['beru.refresh_token']: refreshToken } = parseCookies(ctx)

  if(!token && !refreshToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }  

  return {
    props: {}
  }
}

export default Dashboard;