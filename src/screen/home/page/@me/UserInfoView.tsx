import { FlexCenter, FullView } from "@components/stuff/ShortHands"
import { Center, Heading } from "@hope-ui/solid"
import type { Component } from "solid-js"

const UserInfoView: Component = () => {
  return (
    <Center as={FullView}>
      <Heading size="2xl">Nothing in here :)</Heading>
    </Center>
  )
}

export default UserInfoView