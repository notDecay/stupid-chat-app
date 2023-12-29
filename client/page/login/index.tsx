import { Route } from "@solidjs/router"
import { lazy } from "solid-js"
import { AppRoutes } from "../../../config/app_config"

const LoginPage = lazy(() => import("./LoginPage"))
const RegisterPage = lazy(() => import("./RegisterPage"))

export default function LoginRoutes() {
  return (
    <>
      <Route path={AppRoutes.login} component={LoginPage} />
      <Route path={AppRoutes.register} component={RegisterPage} />
    </>
  )
}