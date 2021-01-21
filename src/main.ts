import {
  Plugin,
  MarkdownPreviewRenderer,
  MarkdownPostProcessor,
  MarkdownPostProcessorContext,
  MarkdownView,
  MarkdownSourceView,
} from "obsidian"

// render react-icons to html
import { renderToString } from "react-dom/server"

import IconsPluginPickerModal from "./modal"
import IconsPluginSettingTab from "./settings"
import { Icon } from "./types"
import { iconSetMeta } from "./meta"
import { faGetIcon, riGetIcon, faAllTypeKey, riAllTypeKey } from "./utils"

export interface IconsPluginSettings {
  enableRis: boolean
  enableRir: boolean
  enableFas: boolean
  enableFar: boolean
}

const DEFAULT_SETTINGS: IconsPluginSettings = {
  enableRis: true,
  enableRir: false,
  enableFas: false,
  enableFar: false,
}

export default class IconsPlugin extends Plugin {
  settings: IconsPluginSettings

  public static postprocessor: MarkdownPostProcessor = (
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext
  ) => {
    const blocksToReplace = el.querySelectorAll("code")
    if (!blocksToReplace) return

    Array.prototype.forEach.call(
      blocksToReplace,
      function (blockToReplace: ChildNode) {
        const block = blockToReplace.textContent
        let iconPrefix: string = "fas"
        if (block.startsWith("fas:")) {
          iconPrefix = "fas"
        } else if (block.startsWith("far:")) {
          iconPrefix = "far"
        } else if (block.startsWith("ris:")) {
          iconPrefix = "ris"
        } else if (block.startsWith("rir:")) {
          iconPrefix = "rir"
        } else {
          return
        }

        if (["fas", "far"].contains(iconPrefix)) {
          let iconName: String = ""
          if (iconPrefix === "fas") {
            iconName = "Fa" + block.replace("fas:", "")
          } else if (iconPrefix === "far") {
            iconName = "FaReg" + block.replace("far:", "")
          } else {
            return
          }
          const typedIconName = iconName as faAllTypeKey
          const destination = document.createElement("span")
          destination.addClass("obsidian-icon")
          destination.addClass("react-icon")
          destination.addClass("react-icon-fontawesome")
          destination.innerHTML = renderToString(
            faGetIcon(typedIconName)({
              size: iconSetMeta[iconPrefix].scaleRender + "%",
            })
          )
          blockToReplace.replaceWith(destination)
        } else if (["ris", "rir"].contains(iconPrefix)) {
          let iconName: String = ""
          if (iconPrefix === "ris") {
            iconName = "Ri" + block.replace("ris:", "") + "Fill"
          } else if (iconPrefix === "rir") {
            iconName = "Ri" + block.replace("rir:", "") + "Line"
          } else {
            return
          }
          const typedIconName = iconName as riAllTypeKey
          const destination = document.createElement("span")
          destination.addClass("obsidian-icon")
          destination.addClass("react-icon")
          destination.addClass("react-icon-remixicons")
          destination.innerHTML = renderToString(
            riGetIcon(typedIconName)({
              size: iconSetMeta[iconPrefix].scaleRender + "%",
            })
          )
          blockToReplace.replaceWith(destination)
        }
      }
    )
  }

  async onload() {
    console.log("loading plugin")

    MarkdownPreviewRenderer.registerPostProcessor(IconsPlugin.postprocessor)

    await this.loadSettings()

    this.addCommand({
      id: "open-icons-plugin-modal",
      name: "Insert Icon",
      hotkeys: [{ modifiers: ["Ctrl", "Shift"], key: "i" }],
      callback: () => {
        const modal = new IconsPluginPickerModal(this.app, this, this.settings)
        modal.open()
      },
    })

    this.addSettingTab(new IconsPluginSettingTab(this.app, this))
  }

  onunload() {
    console.log("unloading plugin")
    MarkdownPreviewRenderer.unregisterPostProcessor(IconsPlugin.postprocessor)
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData())
  }

  async getSettings() {
    return this.settings
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  get editor(): CodeMirror.Editor {
    const view = this.app.workspace.activeLeaf.view
    if (!(view instanceof MarkdownView)) return null

    const sourceView = view.sourceMode
    return (sourceView as MarkdownSourceView).cmEditor
  }

  async insertIcon(icon: Icon): Promise<void> {
    const iconInline = `\`${icon.set}:${icon.name}\``
    this.editor.replaceRange(iconInline, this.editor.getCursor())
  }
}
