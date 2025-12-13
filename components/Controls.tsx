import React from 'react'

type Props = {
  sex: 'male'|'female'
  setSex: (s: 'male'|'female') => void
  age: number
  setAge: (n: number) => void
  heightCm: number
  setHeightCm: (n: number) => void
  weightKg: number
  setWeightKg: (n: number) => void
  bmi: number
}

export default function Controls({ sex, setSex, age, setAge, heightCm, setHeightCm, weightKg, setWeightKg, bmi }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm w-20">Sex</label>
        <select value={sex} onChange={e => setSex(e.target.value as 'male'|'female')} className="border px-2 py-1 rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm w-20">Age</label>
        <input type="number" min={0} max={120} value={age} onChange={e => setAge(Number(e.target.value))} className="border px-2 py-1 rounded w-32" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm w-20">Height (cm)</label>
        <input type="number" min={50} max={250} value={heightCm} onChange={e => setHeightCm(Number(e.target.value))} className="border px-2 py-1 rounded w-32" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm w-20">Weight (kg)</label>
        <input type="number" min={20} max={300} value={weightKg} onChange={e => setWeightKg(Number(e.target.value))} className="border px-2 py-1 rounded w-32" />
      </div>

      <div className="mt-3">
        <div className="text-sm">BMI: <strong>{bmi}</strong></div>
      </div>
    </div>
  )
}
