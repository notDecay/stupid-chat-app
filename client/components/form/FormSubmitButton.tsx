import { Button } from "@hope-ui/solid"
import stylex from "@stylexjs/stylex"

const style = stylex.create({
  submitButtonWrapper: {
    width: '100%',
    marginTop: 40,
    marginBottom: 15
  },
  submitButton: {
    backgroundColor: 'var(--hope-colors-neutral3)',
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 'auto',
  }
})

export default function FormSubmitButton() {
  return (
    <div {...stylex.props(style.submitButtonWrapper)}>
      <Button 
        variant="ghost" 
        colorScheme="neutral" 
        type="submit" 
        {...stylex.props(style.submitButton)}
      >
        Let's goooo
      </Button>
    </div>
  )
}