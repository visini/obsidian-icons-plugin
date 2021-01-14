import { IconSetMeta } from "./types"

const faScalePicker = "50"
const faScaleRender = "70"

const riScalePicker = "65"
const riScaleRender = "85"

export const iconSetMeta: IconSetMeta = {
  ris: {
    name: "Remix Icon",
    variant: "solid",
    scalePicker: riScalePicker,
    scaleRender: riScaleRender,
  },
  rir: {
    name: "Remix Icon",
    variant: "regular",
    scalePicker: riScalePicker,
    scaleRender: riScaleRender,
  },
  fas: {
    name: "Font Awesome",
    variant: "solid",
    scalePicker: faScalePicker,
    scaleRender: faScaleRender,
  },
  far: {
    name: "Font Awesome",
    variant: "regular",
    scalePicker: faScalePicker,
    scaleRender: faScaleRender,
  },
}
