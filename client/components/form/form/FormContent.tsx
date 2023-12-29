import type { createForm } from "@modular-forms/solid"
import stylex from "@stylexjs/stylex"
import { type ParentProps, mergeProps } from "solid-js"

// extracting the type from "@modular-forms/solid"
/* Gets the return type of the 
 * [`createForm()`](https://modularforms.dev/solid/api/createForm) function.
 */
type FormComponentReturnType = ReturnType<typeof createForm>
type FormComponents = FormComponentReturnType[1]

type GetIts<ComponentName extends keyof FormComponents> = {
  component: FormComponents[ComponentName]
  props: Parameters<FormComponents[ComponentName]>[0]
}

const style = stylex.create({
  content: {
    minWidth: "25rem",
    minHeight: "20%",
    backgroundColor: "var(--hope-colors-neutral2)",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 7,
  },
})

interface IFormContent {
  FormComponent: GetIts<"Form">["component"]
  onSubmit: GetIts<"Form">["props"]["onSubmit"]
}

export default function FormContent(props: ParentProps<IFormContent>) {
  const itProps = mergeProps(props, {
    FormComponent: null
  })

  return (
    <props.FormComponent {...itProps} {...stylex.props(style.content)}>
      {props.children}
    </props.FormComponent>
  )
}