declare module 'culori' {
  export interface Color {
    mode: string
    [key: string]: number | string | undefined
  }

  export interface LabColor extends Color {
    mode: 'lab65' | 'lab'
    l: number
    a: number
    b: number
  }

  export function parse(color: string): Color | undefined
  export function converter(mode: 'lab65' | 'lab'): (color: Color) => LabColor | undefined
  export function differenceCiede2000(): (a: LabColor | Color, b: LabColor | Color) => number
}
