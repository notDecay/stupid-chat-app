import { create } from "@stylexjs/stylex"

namespace Styles {
  export const flexCenter = create({
    flexCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }).flexCenter

  export const fullView = create({
    fullView: {
      width: "100%",
      height: "100%"
    }
  }).fullView
}

export default Styles