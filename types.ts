export type ClotDataEntry = {
  id: string
  name: string
  shortLabel?: string
  sex: ('male'|'female')[]
  position3D: [number,number,number]
  baseRisk: number
  commonSymptoms: string[]
  notes?: string
}
