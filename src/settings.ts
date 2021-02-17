import { App, PluginSettingTab, Setting } from "obsidian"

import IconsPlugin from "./main"

export default class IconsPluginSettingTab extends PluginSettingTab {
  plugin: IconsPlugin

  constructor(app: App, plugin: IconsPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    let { containerEl } = this

    containerEl.empty()

    containerEl.createEl("h2", { text: "Icons Plugin Settings" })

    new Setting(containerEl)
      .setName("Enable Remix Icon (Solid)")
      .setDesc(
        "This enables all solid variants from the Remix Icon set. More Information: https://remixicon.com/"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableRis)
          .onChange(async (value) => {
            this.plugin.settings.enableRis = value
            await this.plugin.saveSettings()
          })
      )

    new Setting(containerEl)
      .setName("Enable Remix Icon (Regular)")
      .setDesc(
        "This enables all regular variants from the Remix Icon set. More Information: https://remixicon.com/"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableRir)
          .onChange(async (value) => {
            this.plugin.settings.enableRir = value
            await this.plugin.saveSettings()
          })
      )

    new Setting(containerEl)
      .setName("Enable FontAwesome (Solid)")
      .setDesc(
        "This enables all solid variants from the FontAwesome set. More Information: https://fontawesome.com/"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableFas)
          .onChange(async (value) => {
            this.plugin.settings.enableFas = value
            await this.plugin.saveSettings()
          })
      )

    new Setting(containerEl)
      .setName("Enable FontAwesome (Regular)")
      .setDesc(
        "This enables all regular variants from the FontAwesome set. More Information: https://fontawesome.com/"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableFar)
          .onChange(async (value) => {
            this.plugin.settings.enableFar = value
            await this.plugin.saveSettings()
          })
      )

    new Setting(containerEl)
      .setName("Icon Alias Mapping")
      .setDesc(
        "Add aliases for your favorite icons (one alias-to-icon mapping per line). For example, to use `heart` as an alias for the fas:Heart icon, enter: heart=fas:Heart"
      )
      .addTextArea((textArea) =>
        textArea
          .setValue(this.plugin.settings.aliasMapping)
          .onChange(async (value) => {
            this.plugin.settings.aliasMapping = value
            await this.plugin.saveSettings()
          })
      )
  }
}
