import { Button, Center } from "@hope-ui/solid"
import { BsPlus } from "solid-icons/bs"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  moreOptionsWrapper: {
    height: '100%'
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: '9px',
    // overriding hope-ui's button styles to show the icon
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  }
})

/**Creates the message input more options button
 * @returns JSX element
 * @component
 */
export default function InputMoreOptions() {
  return (
    <div {...stylex.props(style.moreOptionsWrapper)}>
      <Button
        {...stylex.props(style.button)}
        background="$neutral4"
        as={Center}
        colorScheme="neutral"
      >
        <BsPlus size={25} />
      </Button>
    </div>
  )
}