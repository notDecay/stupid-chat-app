import type { Maybe } from "@modular-forms/solid"
import stylex from "@stylexjs/stylex"
import { splitProps, type JSX, Show } from "solid-js"

const style = stylex.create({
  inputLabel: {
    marginBottom: 5,
    display: "block",
  },
  inputField: {
    marginBottom: 15,
  },
  input: {
    outline: "none",
    border: "none",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: 'var(--hope-colors-neutral4)',
    color: 'var(--hope-colors-neutral12)',
    borderRadius: 5,
    width: '100%'
  },
  required: {
    color: 'var(--hope-colors-danger10)',
    marginLeft: 7,
  },
  errorText: {
    color: 'var(--hope-colors-danger10)',
    fontSize: 16
  },
})

interface ITextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date'
  label: Maybe<string>
  error: string
  value: Maybe<string>
  name: string
  autocomplete?: HTMLInputElement["autocomplete"]
}

export default function FormInput(props: ITextInputProps) {
  const [, inputProps] = splitProps(props, ['value', 'label', 'error'])
  return (
    <div {...stylex.props(style.inputField)}>
      <Show when={props.label}>
        <InputLabel {...props} />
      </Show>
      <input
        {...inputProps}
        id={props.name}
        value={props.value || ''}
        {...stylex.props(style.input)}
      />
      <Show when={props.error}>
        <InputErrorText name={props.name} error={props.error} />
      </Show>
    </div>
  )
}

function InputLabel(props: ITextInputProps) {
  return (
    <label for={props.name} {...stylex.props(style.inputLabel)}>
      {props.label}
      <Show when={props.required}>
        <span {...stylex.props(style.required)}>*</span>
      </Show>
    </label>
  )
}

interface IInputErrorTextProps {
  name: string
  error?: Maybe<string>
}

function InputErrorText(props: IInputErrorTextProps) {
  return (
    <div 
      id={`${props.name}-error`}
      {...stylex.props(style.errorText)}
    >{props.error}</div>
  )
}