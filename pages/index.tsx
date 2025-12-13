import { useState } from 'react'
import dynamic from 'next/dynamic'
import Controls from '../components/Controls'
import { ClotDataEntry } from '../types'
import clotData from '../data/clots.json'
import { calculateRisk } from '../lib/risk'

const AnatomyViewer = dynamic(() => import('../components/AnatomyViewer'), { ssr: false })

export default function Home() {
  const [selected, setSelected] = useState<ClotDataEntry | null>(null)
  const [sex, setSex] = useState<'male'|'female'>('male')
  const [age, setAge] = useState<number>(40)
  const [heightCm, setHeightCm] = useState<number>(170)
  const [weightKg, setWeightKg] = useState<number>(75)

  const bmi = Number((weightKg / ((heightCm/100) ** 2)).toFixed(1))

  const onSelect = (id?: string) => {
    const entry = clotData.clotLocations.find(c => c.id === id) || null
    setSelected(entry)
  }

  const riskValue = selected ? calculateRisk(selected.baseRisk, { bmi, age, sex }) : null

  // placeholder external GLB files (Khronos sample Avocado) - replace with vascular GLBs in /public/models
  const placeholderMale = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb'
  const placeholderFemale = placeholderMale

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-semibold">3D Interactive Clot Anatomy — Prototype</h1>
        <p className="text-sm text-gray-600">Educational demo (read-only). Not a diagnostic tool.</p>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <section className="md:col-span-2 bg-white rounded shadow h-[70vh]">
          <AnatomyViewer
            modelPath={sex === 'male' ? placeholderMale : placeholderFemale}
            clotLocations={clotData.clotLocations.filter(c => c.sex.includes(sex))}
            onSelect={onSelect}
          />
        </section>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <Controls
              sex={sex}
              setSex={(s) => setSex(s)}
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
                <p className="text-sm text-gray-600 mt-1">{selected.notes}</p>
                <div className="mt-3">
                  <strong>Common symptoms</strong>
                  <ul className="list-disc list-inside mt-2">
                    {selected.commonSymptoms.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="mt-3">
                  <strong>Estimated risk</strong>
                  <div className="mt-1">
                    <div className="text-sm">Score: {riskValue ? (riskValue * 100).toFixed(1) + '%' : '—'}</div>
                    <div className="text-xs text-gray-600 mt-1">This numeric estimate is illustrative. Clinical review required.</div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-600">Click a hotspot in the 3D viewer to view clot details.</p>
            )}
          </div>

          <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-900">
            <strong>Medical disclaimer:</strong> This prototype is for educational purposes only and must not be relied upon for diagnosis or treatment. Validate clinical content with a qualified clinician.
          </div>
        </aside>
      </main>

      <footer className="p-4 text-center text-xs text-gray-500">
        Prototype — replace models in /public/models with open-source vascular GLB files (see README).
      </footer>
    </div>
  )
}
