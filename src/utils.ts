// Fontawesome

import * as faAll from "react-icons/fa/index"
export type faAllType = typeof faAll
export type faAllTypeKey = keyof faAllType
let faIcons: any = Object.keys(faAll)
const faIndexDefault = faIcons.indexOf("default")
if (faIndexDefault > -1) {
  faIcons.splice(faIndexDefault, 1)
}
export const faAllIcons = faIcons as Array<faAllTypeKey>
let faSolidIcons: Array<faAllTypeKey> = []
let faRegularIcons: Array<faAllTypeKey> = []
for (let icon of faAllIcons) {
  if (!icon.contains("FaReg") || icon === "FaRegistered") {
    faSolidIcons.push(icon as faAllTypeKey)
  } else {
    faRegularIcons.push(icon as faAllTypeKey)
  }
}
export const faAllSolidIcons = faSolidIcons
export const faAllRegularIcons = faRegularIcons

export function faGetIcon<K extends faAllTypeKey>(input: K): faAllType[K] {
  return faAll[input]
}

// RemixIcons

import * as riAll from "react-icons/ri/index"
export type riAllType = typeof riAll
export type riAllTypeKey = keyof riAllType
let riIcons: any = Object.keys(riAll)
const riIndexDefault = riIcons.indexOf("default")
if (riIndexDefault > -1) {
  riIcons.splice(riIndexDefault, 1)
}
export const riAllIcons = riIcons as Array<riAllTypeKey>
let riSolidIcons: Array<riAllTypeKey> = []
let riRegularIcons: Array<riAllTypeKey> = []
for (let icon of riAllIcons) {
  if (!icon.contains("Line")) {
    riSolidIcons.push(icon as riAllTypeKey)
  } else {
    riRegularIcons.push(icon as riAllTypeKey)
  }
}
export const riAllSolidIcons = riSolidIcons
export const riAllRegularIcons = riRegularIcons

export function riGetIcon<K extends riAllTypeKey>(input: K): riAllType[K] {
  return riAll[input]
}
