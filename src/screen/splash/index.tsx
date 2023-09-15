import { FlexCenter, FullView } from "@components/stuff/ShortHands"
import type { Component } from "solid-js"

import './Splash.scss'
import { Box, Center, Heading } from "@hope-ui/solid"
import Cube from "./Cube"
import randomTexts from "./randomTexts"

interface ISplashProps {
  isDone: boolean
}

const Splash: Component<{
  ref: HTMLDivElement
}> = ({ ref }) => {
  return (
    <FullView class="splash this-is-loading-screen" ref={ref}>
      <FullView class="splash-wrapper">
        <SplashContent />
      </FullView>
    </FullView>
  )
}

export default Splash

const SplashContent = () => {
  return (
    <>
      <FullView class="splash-wrapper">
        <AnotherSplashWrapperAAAA />
      </FullView>
      <FullView class="log-ui" style={{
        padding: '1rem'
      }}>
        {/* <div>Build 1.0.0 alpha-1, api v1.0.0 alpha-1</div> */}
        <div class="logs" style={{
          "font-size": '13px',
        }}>Awaking duck...</div>
      </FullView>
    </>
  )
}

const AnotherSplashWrapperAAAA: Component = () => {
  return (
    <>
      <Center as={FullView}>
        <Cube />
      </Center>
      <FlexCenter centerOn="x" as={FullView}>
        {/* <Box marginTop='auto' marginBottom='1.5rem'>
          <Heading size="2xl">{randomTexts[Math.floor(Math.random() * randomTexts.length)]}</Heading>
        </Box> */}
      </FlexCenter>
      <FullView class="hide-it">
        <FullView class="the-darkness">
          <div></div>
        </FullView>
      </FullView>
    </>
  )
}