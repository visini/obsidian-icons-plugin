export type Icon = {
  set: string
  id: string
  name: string
  displayName: string
}

export type IconSetMeta = {
  [name: string]: {
    name: string
    variant: string
    scalePicker: string
    scaleRender: string
  }
}
