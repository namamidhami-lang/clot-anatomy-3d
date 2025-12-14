{selected ? (
  <>
    <h3 className="mt-2 text-lg">{selected.name}</h3>
    <p className="text-sm text-gray-600 mt-1">{selected.notes}</p>

    <div className="mt-3">
      <strong>Common symptoms</strong>
      <ul className="list-disc list-inside mt-2">
        {selected.commonSymptoms.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>

    <div className="mt-3">
      <strong>Estimated risk</strong>
      <div className="mt-1">
        <div className="text-sm">
          Score: {riskValue ? `${(riskValue * 100).toFixed(1)}%` : '—'}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Illustrative only. Clinical review required.
        </div>
      </div>
    </div>
  </>
) : (
  <p className="text-sm text-gray-600">
    Click a hotspot on the body to view details.
  </p>
)}
