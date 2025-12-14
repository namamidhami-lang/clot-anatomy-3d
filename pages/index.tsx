import { useState } from 'react'
import dynamic from 'next/dynamic'
import Controls from '../components/Controls'
import { ClotDataEntry } from '../types'
import clotData from '../data/clots.json'
import { calculateRisk } from '../lib/risk'

const AnatomyViewer = dynamic(
  () => import('../components/AnatomyViewer'),
  { ssr: false }
)

export default function Home() {
  const [selected, setSelected] = useState<ClotDataEntry | null>(null)
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState(40)
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(75)

  const bmi = Number((weightKg / ((heightCm / 100) ** 2)).toFixed(1))

  const onSelect = (id?: string) => {
    const entry =
      clotData.clotLocations.find(c => c.id === id) || null
    setSelected(entry)
  }

  const riskValue = selected
    ? calculateRisk(selected.baseRisk, { bmi, age, sex })
    : null

  const maleModel = '/models/male.glb'
  const femaleModel = '/models/female.glb' // add later

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-semibold">
          3D Interactive Clot Anatomy — Prototype
        </h1>
        <p className="text-sm text-gray-600">
          Educational demo. Not a diagnostic tool.
        </p>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <section className="md:col-span-2 bg-white rounded shadow h-[70vh]">
          <AnatomyViewer
            modelPath={sex === 'male' ? maleModel : femaleModel}
            clotLocations={clotData.clotLocations.filter(c =>
              c.sex.includes(sex)
            )}
            onSelect={onSelect}
          />
        </section>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <Controls
              sex={sex}
              setSex={setSex}
              age={age}
              setAge={setAge}
              heightCm={heightCm}
              setHeightCm={setHeightCm}
              weightKg={weightKg}
              setWeightKg={setWeightKg}
              bmi={bmi}
            />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-medium">Selected Clot</h2>
            {selected ? (
              <>
                <h3 className="mt-2 text-lg">{selected.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selected.notes}
                </p>

                <strong className="block mt-3">Common symptoms</strong>
                <ul className="list-disc list-inside">
                  {selected.commonSymptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <div className="mt-3">
                  <strong>Estimated risk</strong>
                  <div className="text-sm">
                    {riskValue
                      ? `${(riskValue * 100).toFixed(1)}%`
                      : '—'}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                Click a hotspot on the body to view details.
              </p>
            )}
          </div>
        </aside>
      </main>
    </div>
  )
}
