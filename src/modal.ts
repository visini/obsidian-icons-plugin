import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian"

import IconsPlugin, { IconsPluginSettings } from "./main"
import { Icon } from "./types"
import { iconSetMeta } from "./meta"

import {
  faAllSolidIcons,
  faAllRegularIcons,
  faGetIcon,
  riAllSolidIcons,
  riAllRegularIcons,
  riGetIcon,
} from "./utils"

// render react-icons to html
import { renderToString } from "react-dom/server"

export default class IconsPluginPickerModal extends FuzzySuggestModal<any> {
  plugin: IconsPlugin
  settings: IconsPluginSettings

  constructor(app: App, plugin: IconsPlugin, settings: IconsPluginSettings) {
    super(app)
    this.plugin = plugin
    this.settings = settings
  }

  onOpen() {
    super.onOpen()
  }

  onClose() {
    let { contentEl } = this
    contentEl.empty()
  }

  getIconNameFromId(iconSetName: string, iconId: string): string {
    let iconName = ""

    if (iconSetName === "fas") {
      iconName = iconId.replace(/^(Fa)/, "")
    } else if (iconSetName === "far") {
      iconName = iconId.replace(/^(FaReg)/, "")
    } else if (iconSetName === "ris") {
      iconName = iconId.replace(/^(Ri)/, "").replace(/(Fill)$/, "")
    } else if (iconSetName === "rir") {
      iconName = iconId.replace(/^(Ri)/, "").replace(/(Line)$/, "")
    } else {
      return
    }
    return iconName
  }

  extractIcons(
    iconSetName: string,
    iconSet: Array<string>,
    iconList: Array<Icon>
  ): any {
    function camelPad(str: string) {
      return str
        .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
        .replace(/([a-z\d])([A-Z])/g, "$1 $2")
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
        .replace(/^./, function (str) {
          return str.toUpperCase()
        })
        .trim()
    }

    for (let i in iconSet) {
      const iconName = this.getIconNameFromId(iconSetName, iconSet[i])
      iconList.push({
        set: iconSetName,
        id: iconSet[i],
        name: iconName,
        displayName: camelPad(iconName),
      })
    }

    return iconList
  }

  getItems(): any {
    let iconList: Array<Icon> = []

    // fontawesome
    if (this.settings.enableFas) {
      iconList = this.extractIcons("fas", faAllSolidIcons, iconList)
    }
    if (this.settings.enableFar) {
      iconList = this.extractIcons("far", faAllRegularIcons, iconList)
    }

    // // remixicons
    if (this.settings.enableRis) {
      iconList = this.extractIcons("ris", riAllSolidIcons, iconList)
    }
    if (this.settings.enableRir) {
      iconList = this.extractIcons("rir", riAllRegularIcons, iconList)
    }

    return iconList
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChooseItem(item: Icon, evt: MouseEvent | KeyboardEvent): void {
    this.plugin.insertIcon(item).catch(console.error)
  }

  getItemText(item: Icon): string {
    return `${item.name}`
  }

  renderSuggestion(match: FuzzyMatch<any>, el: HTMLElement): void {
    el.empty()
    const suggestedIcon = match.item

    let iconHtml = "?"

    if (["fas", "far"].contains(suggestedIcon.set)) {
      if (typeof faGetIcon(suggestedIcon.id) !== "function") {
        console.log(suggestedIcon)
        iconHtml = "?"
      } else {
        iconHtml = renderToString(
          faGetIcon(suggestedIcon.id)({
            size: iconSetMeta[suggestedIcon.set].scalePicker + "%",
          })
        )
      }
    } else if (["ris", "rir"].contains(suggestedIcon.set)) {
      if (typeof riGetIcon(suggestedIcon.id) !== "function") {
        console.log(suggestedIcon)
        iconHtml = "?"
      } else {
        iconHtml = renderToString(
          riGetIcon(suggestedIcon.id)({
            size: iconSetMeta[suggestedIcon.set].scalePicker + "%",
          })
        )
      }
    }

    const container = el.createEl("div", { cls: "" })

    const renderedResult = container.createEl("span", { cls: "" })
    const innerResult = renderedResult.createEl("span", {
      cls: "obsidian-icon react-icon " + suggestedIcon.set + "-icon",
    })
    innerResult.innerHTML = `${iconHtml}`
    const innerText = renderedResult.createEl("span", {
      cls: "",
      text: `${suggestedIcon.displayName} (${
        iconSetMeta[suggestedIcon.set].variant
      })`,
    })
  }
}
