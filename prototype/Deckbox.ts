import * as decimal from 'decimal.js'
import * as SVG from 'svg.js'

enum Unit {
  mm,
  inches
}

class Deckbox {
  private readonly FLAP_RADIUS = 8
  private readonly GLUE_TAB_OFFSET = 3
  constructor(
    readonly width: decimal.Decimal,
    readonly height: decimal.Decimal,
    readonly depth: decimal.Decimal,
    readonly unit: Unit = Unit.mm,
    readonly tabSize: decimal.Decimal = new decimal('15'),
    readonly tolerance: decimal.Decimal = new decimal('0.5')
  ) { };

  draw(dpi: number) {
    console.log(this.generateCutlineSvgPath())
  }

  private generateCutlineSvgPath(): string {
    let halfTab = this.tabSize.div(2).plus(1)
    let halfWidthToTab = this.width.minus(this.tabSize).div(2)

    return (
      // Set origin point
      `M 0 ${this.tabSize.plus(this.depth)} ` +

      // Top-left flap
      `h ${this.tolerance} ` +
      `v -${this.tabSize.minus(this.FLAP_RADIUS)} ` +
      `a 8 8 90 0 1 8 -8 ` +
      `h ${this.depth.minus(this.FLAP_RADIUS + 1)} ` +
      `v ${this.tabSize} ` + 
      `h ${this.tolerance} ` +

      // Top flap
      `v -${this.depth} ` +
      `h ${this.tolerance} ` +
      `v -${this.tabSize.minus(this.FLAP_RADIUS)} ` +
      `a 8 8 90 0 1 8 -8 ` +
      `h ${this.width.minus(this.FLAP_RADIUS * 2 + 1)} ` +
      `a 8 8 -90 0 1 8 8 ` +
      `v ${this.tabSize.minus(this.FLAP_RADIUS)} ` +
      `h ${this.tolerance} ` +
      `v ${this.depth} ` +

      // Top-right flap
      `h ${this.tolerance} ` +
      `v -${this.tabSize} ` + 
      `h ${this.depth.minus(this.FLAP_RADIUS + 1)} ` +
      `a 8 8 -90 0 1 8 8 ` +
      `v ${this.tabSize.minus(this.FLAP_RADIUS)} ` +
      `h ${this.tolerance} ` +

      // Back panel
      `h ${halfWidthToTab} ` +
      `a ${halfTab} ${halfTab} 0 0 0 ${this.tabSize} 0 ` +
      `h ${halfWidthToTab} ` +

      // Glue tab - right
      `l ${this.depth.minus(this.GLUE_TAB_OFFSET)} ${this.GLUE_TAB_OFFSET} ` +
      `v ${this.height.minus(this.GLUE_TAB_OFFSET * 2) } ` +
      `l -${this.depth.minus(this.GLUE_TAB_OFFSET)} ${this.GLUE_TAB_OFFSET} ` +

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
    )
  }

  private generateBleedSvgPath(): string {
    return ''
  }
}


// Testing main line for now
let deckbox = new Deckbox(
  new decimal(63), new decimal(88), new decimal(20))
deckbox.draw(96)
