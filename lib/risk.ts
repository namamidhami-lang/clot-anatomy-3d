type Modifiers = { bmi: number; age: number; sex: 'male'|'female' }

export function calculateRisk(baseRisk: number, modifiers: Modifiers) {
  let bmiFactor = 1
  if (modifiers.bmi >= 30) bmiFactor = 1.5
  else if (modifiers.bmi >= 25) bmiFactor = 1.2

  let ageFactor = 1
  if (modifiers.age >= 65) ageFactor = 1.5
  else if (modifiers.age >= 40) ageFactor = 1.2

  const sexFactor = 1

  const risk = baseRisk * bmiFactor * ageFactor * sexFactor
  return Math.min(1, Math.max(0, risk))
}
