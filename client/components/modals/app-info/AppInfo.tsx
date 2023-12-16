import { Flex, Tag } from "@hope-ui/solid"
import type { JSX, ParentProps } from "solid-js"

import style from "./AppInfo.module.scss"

interface IInfoVersionProps {
  labelName: string
  version: JSX.Element
}

const AppInfo = {
  Content(props: ParentProps) {
    // const appIconUrl = document.querySelector<HTMLAnchorElement>("#something")
    // console.log(appIconUrl)

    return (
      <Flex gap={35} class={style["app-info"]}>
        <div class={style["info-content"]}>
          {props.children}
        </div>
      </Flex>
    )
  },

  // I don't really know how to name this component lol
  // todo: thinks a better name than this
  Version(props: IInfoVersionProps) {
    return (
      <div class={style.version}>
        <Tag>{props.labelName}</Tag>: {props.version}
      </div>
    )
  }
}

export default AppInfo