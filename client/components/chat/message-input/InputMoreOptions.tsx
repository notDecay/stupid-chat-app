import { Button, Center } from "@hope-ui/solid"
import style from "./index.module.scss"
import { BsPlus } from "solid-icons/bs"

/**Creates the message input more options button
 * @returns JSX element
 * @component
 */
export default function InputMoreOptions() {
  return (
    <div class={style["more-options-wrapper"]}>
      <Button
        class={style["more-options"]} 
        boxSize={35} 
        background="$neutral4"
        as={Center}
        colorScheme="neutral"
      >
        <BsPlus size={25} />
      </Button>
    </div>
  )
}