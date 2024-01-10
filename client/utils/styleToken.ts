import stylex from "@stylexjs/stylex"

export const styleToken = stylex.create({
  fullScreen: {
    width: '100%',
    height: '100%'
  },
  fullScreen_before: {
    "::before": {
      width: '100%',
      height: '100%'
    }
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    borderRadius: '50%'
  }
})