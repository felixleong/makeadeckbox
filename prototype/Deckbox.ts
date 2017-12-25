import * as decimal from 'decimal.js'
import * as SVG from 'svg.js'

enum Unit {
  mm,
  cm,
  inches
}

export class Deckbox {
  private readonly FLAP_RADIUS = 8
  private readonly GLUE_TAB_OFFSET = 3
  private readonly BLEED_OFFSET = 3

  constructor(
    readonly width: decimal.Decimal,
    readonly height: decimal.Decimal,
    readonly depth: decimal.Decimal,
    readonly tabSize: decimal.Decimal = new decimal('15'),
    readonly tolerance: decimal.Decimal = new decimal('0.5'),
    readonly dpi: number = 96
  ) { };

  get dpiScale(): number {
    return this.dpi / 25.4
  }

  get backgroundPath(): string {
    return (
      // Origin point
      `M 0 ${this.tabSize.plus(this.depth).plus(this.BLEED_OFFSET)} ` +

      // Top-left flap
      `v -${this.tabSize.plus(this.BLEED_OFFSET).minus(this.FLAP_RADIUS)} ` +
      `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} 90 0 1 ` +
      `  ${this.FLAP_RADIUS} -${this.FLAP_RADIUS} ` +
      `h ${this.depth.minus(this.FLAP_RADIUS)} ` +

      // Top flap
      `v -${this.depth.minus(this.FLAP_RADIUS)} ` +
      `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} 90 0 1 ` +
      `  ${this.FLAP_RADIUS} -${this.FLAP_RADIUS} ` +
      `h ${
        this.width.plus(this.BLEED_OFFSET *2).minus(this.FLAP_RADIUS * 2)} ` +
      `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} -90 0 1 ` +
      `  ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} ` +
      `v ${this.depth.minus(this.FLAP_RADIUS)} ` +

      // Top-right flap
      `h ${this.depth.minus(this.FLAP_RADIUS)} ` +
      `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} -90 0 1 ` +
      `  ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} ` +
      `v ${this.tabSize.minus(this.FLAP_RADIUS)} ` +

      // Back segment
      `h ${this.width} ` +
      `v ${this.height.plus(this.depth).plus(this.BLEED_OFFSET * 2)} ` +
      `h -${this.width.plus(this.BLEED_OFFSET * 2)} ` +
      `v -${this.depth} ` +

      // Front-bottom flaps
      `h -${this.depth.times(2).plus(this.width)} ` +

      // Close path
      'z')
  }

  get userunitOrigin(): string {
    let coord = this.dpiScale * this.BLEED_OFFSET
    return `${coord} ${coord}`
  }

  get cutlinePaths(): string[] {
    let halfTab = this.tabSize.div(2).plus(1)
    let halfWidthToTab = this.width.minus(this.tabSize).div(2)

    return [
      // The base cutline
      (
        // Set origin point
        `M 0 ${this.tabSize.plus(this.depth)} ` +

        // Top-left flap
        `h ${this.tolerance} ` +
        `v -${this.tabSize.minus(this.FLAP_RADIUS)} ` +
        `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} 90 0 1 ` +
        `  ${this.FLAP_RADIUS} -${this.FLAP_RADIUS} ` +
        `h ${this.depth.minus(this.FLAP_RADIUS + 1)} ` +
        `v ${this.tabSize} ` +
        `h ${this.tolerance} ` +

        // Top flap
        `v -${this.depth} ` +
        `h ${this.tolerance} ` +
        `v -${this.tabSize.minus(this.FLAP_RADIUS)} ` +
        `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} 90 0 1 ` +
        `  ${this.FLAP_RADIUS} -${this.FLAP_RADIUS} ` +
        `h ${this.width.minus(this.FLAP_RADIUS * 2 + 1)} ` +
        `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} -90 0 1 ` +
        `  ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} ` +
        `v ${this.tabSize.minus(this.FLAP_RADIUS)} ` +
        `h ${this.tolerance} ` +
        `v ${this.depth} ` +

        // Top-right flap
        `h ${this.tolerance} ` +
        `v -${this.tabSize} ` +
        `h ${this.depth.minus(this.FLAP_RADIUS + 1)} ` +
        `a ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} -90 0 1 ` +
        `  ${this.FLAP_RADIUS} ${this.FLAP_RADIUS} ` +
        `v ${this.tabSize.minus(this.FLAP_RADIUS)} ` +
        `h ${this.tolerance} ` +

        // Back panel
        `h ${halfWidthToTab} ` +
        `a ${halfTab} ${halfTab} 0 0 0 ${this.tabSize} 0 ` +
        `h ${halfWidthToTab} ` +

        // Glue tab - right
        `l ${this.depth.minus(this.GLUE_TAB_OFFSET)} ${this.GLUE_TAB_OFFSET} ` +
        `v ${this.height.minus(this.GLUE_TAB_OFFSET * 2) } ` +
        `l -${this.depth.minus(this.GLUE_TAB_OFFSET)}
           ${this.GLUE_TAB_OFFSET} ` +

        // Bottom flap
        `v ${this.depth} h -${this.width} v -${this.depth} ` +

        // Bottom-right flap
        `l -${this.GLUE_TAB_OFFSET} ${this.tabSize} ` +
        `h -${this.depth.minus(this.GLUE_TAB_OFFSET * 2)} ` +
        `l -${this.GLUE_TAB_OFFSET} -${this.tabSize} ` +

        // Glue tab - bottom
        `v ${this.depth.minus(this.GLUE_TAB_OFFSET)} ` +
        `h -${this.width} ` +
        `v -${this.depth.minus(this.GLUE_TAB_OFFSET)} ` +

        // Bottom-left flap
        `l -${this.GLUE_TAB_OFFSET} ${this.tabSize} ` +
        `h -${this.depth.minus(this.GLUE_TAB_OFFSET * 2)} ` +
        `l -${this.GLUE_TAB_OFFSET} -${this.tabSize} ` +

        // Close path
        'z'
      ),

      // Top flap notch - left
      (
        `M ${this.depth.plus(this.tolerance)}
           ${this.tabSize.minus(this.tolerance)} ` +
        'h 2 ' +
        'a 2 2 -90 0 1 2 1'
      ),

      // Top flap notch - right
      (
        `M ${this.depth.plus(this.width).minus(this.tolerance)}
           ${this.tabSize.minus(this.tolerance)} ` +
        'h -2 ' +
        'a 2 2 90 0 0 -2 1'
      )
    ]
  }
}
