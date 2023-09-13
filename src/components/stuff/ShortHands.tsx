import { Box, Flex, Grid, type GridProps, type HopeComponent } from "@hope-ui/solid";
import type { Component, JSX, ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
// import { ParentComponent } from "solid-js";

export const FullView: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const _class = ((props.class ?? '') + ' full-view').trim()
  delete props.class
  return (
    <div class={_class} {...props}>{props.children}</div>
  )
}

interface IPageViewProps {
  sidebar: Component
  main: Component
}

export const PageView: Component<GridProps & IPageViewProps> = (props) => {
  const newProps: GridProps & Partial<IPageViewProps> = {
    ...props,
    sidebar: undefined,
    main: undefined
  }

  return (
    <Grid gridTemplateColumns="350px 1fr" {...newProps} as={FullView}>
      <Box backgroundColor='$neutral3' px={10} py={15} borderRight='1px solid $neutral8'>
        <Dynamic component={props.sidebar} />
      </Box>
      <Box backgroundColor='$neutral2'>
        <Dynamic component={props.main} />
      </Box>
    </Grid>
  )
}

interface IFlexCenterProps {
  centerOn: 'x' | 'y'
}

export const FlexCenter: HopeComponent<"div", IFlexCenterProps & JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const newProps: Partial<IFlexCenterProps> = {
    ...props,
    centerOn: undefined
  }

  return (
    //@ts-ignore
    <Flex {...newProps} {...(
      props.centerOn == 'x' ? { justifyContent: 'center' } : {
        alignItems: 'center'
      }
    )}>
      {props.children}
    </Flex>
  )
}

interface IScrollableProps {
  scrollOn: 'x' | 'y'
}

export const Scrollable: HopeComponent<"div", IScrollableProps> = (props) => {
  const newProps: Partial<IScrollableProps> = {
    ...props,
    scrollOn: undefined
  }
  
  return (
    //@ts-ignore
    <Box {...newProps} {...(
      props.scrollOn == 'x' ? { overflowX: 'scroll' } : {
        overflowY: 'scroll'
      }
    )} willChange='transform'>{props.children}</Box>
  )
}