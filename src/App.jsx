import { useState } from 'react'
import './App.css'

// Prix fixe du token TRUST
const TRUST_PRICE = 0.042

// Configuration des types de relics avec leurs multiplicateurs
const RELIC_TYPES = [
  { id: 'common', name: 'Common', multiplier: 1.02, color: 'gray' },
  { id: 'rare', name: 'Rare', multiplier: 1.05, color: 'blue' },
  { id: 'epic', name: 'Epic', multiplier: 1.12, color: 'purple' },
  { id: 'legendary', name: 'Legendary', multiplier: 1.25, color: 'orange' },
  { id: 'ancient', name: 'Ancient', multiplier: 1.50, color: 'yellow' },
  { id: 'mystic', name: 'Mystic', multiplier: 2.00, color: 'pink' }
]

// Configuration des rôles Discord dans l'ordre hiérarchique (du plus petit au plus grand)
const DISCORD_ROLES = [
  { id: 'wanderer', name: 'Wanderer', level: 42, multiplier: 1.02, color: 'indigo', description: '+2% bonus' },
  { id: 'traveler', name: 'Traveler', level: 25, multiplier: 1.04, color: 'orange', description: '+4% bonus' },
  { id: 'disciple', name: 'Disciple', level: 21, multiplier: 1.06, color: 'cyan', description: '+6% bonus' },
  { id: 'enchanter', name: 'Enchanter', level: 9, multiplier: 1.08, color: 'pink', description: '+8% bonus' },
  { id: 'illuminated', name: 'Illuminated', level: 7, multiplier: 1.10, color: 'yellow', description: '+10% bonus' },
  { id: 'flamebearer', name: 'Flamebearer', level: 3, multiplier: 1.12, color: 'red', description: '+12% bonus' },
  { id: 'conscious', name: 'Conscious', level: 9, multiplier: 1.15, color: 'green', description: '+15% bonus' },
  { id: 'oracle', name: 'Oracle', level: 5, multiplier: 1.20, color: 'purple', description: '+20% bonus' }
]

// Formules de calcul cohérentes
const calculateTrustTokens = (iqPoints) => {
  // Nouvelle formule : 1000 IQ points = 10 tokens
  return (iqPoints / 1000) * 10
}

const calculateRelicMultiplier = (relics) => {
  return Object.entries(relics).reduce((total, [relicType, count]) => {
    const relic = RELIC_TYPES.find(r => r.id === relicType)
    return total * Math.pow(relic.multiplier, count)
  }, 1)
}

const calculateDiscordRoleBonus = (selectedRole) => {
  if (!selectedRole) return 1
  const role = DISCORD_ROLES.find(r => r.id === selectedRole)
  return role ? role.multiplier : 1
}

function App() {
  const [iqPoints, setIqPoints] = useState('')
  const [holdRelic, setHoldRelic] = useState(false)
  const [relics, setRelics] = useState({
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    ancient: 0,
    mystic: 0
  })
  const [hasDiscordRole, setHasDiscordRole] = useState(false)
  const [selectedDiscordRole, setSelectedDiscordRole] = useState(null)
  const [result, setResult] = useState(null)

  const updateRelicCount = (relicType, change) => {
    setRelics(prev => ({
      ...prev,
      [relicType]: Math.max(0, prev[relicType] + change)
    }))
  }

  const resetRelicCounts = () => {
    setRelics({
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      ancient: 0,
      mystic: 0
    })
  }

  const handleSimulation = () => {
    if (!iqPoints || iqPoints <= 0) {
      alert('Please enter a valid number of IQ points')
      return
    }

    // Calcul de base
    const baseTrustTokens = calculateTrustTokens(parseInt(iqPoints))
    
    // Multiplicateur des relics
    const relicMultiplier = holdRelic 
      ? calculateRelicMultiplier(relics)
      : 1
    
    // Bonus rôle Discord
    const discordMultiplier = hasDiscordRole ? calculateDiscordRoleBonus(selectedDiscordRole) : 1
    
    // Calcul final
    const finalTrustTokens = Math.floor(baseTrustTokens * relicMultiplier * discordMultiplier)
    const totalValueUSD = finalTrustTokens * TRUST_PRICE

    setResult({
      iqPoints: parseInt(iqPoints),
      baseTrustTokens,
      relicMultiplier,
      discordMultiplier,
      finalTrustTokens,
      totalValueUSD,
      totalRelics: Object.values(relics).reduce((sum, count) => sum + count, 0)
    })
  }

  const resetForm = () => {
    setIqPoints('')
    setHoldRelic(false)
    resetRelicCounts()
    setHasDiscordRole(false)
    setSelectedDiscordRole(null)
    setResult(null)
  }

  return (
    <div className="min-h-screen relative">
      {/* Fond animé */}
      <div className="animated-background floating-particles"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              TRUST Airdrop
            </h1>
            <p className="text-gray-400 text-lg">
              Airdrop Simulator • TRUST Price: <span className="text-green-400 font-semibold">${TRUST_PRICE}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne de gauche - Formulaire */}
            <div className="space-y-6">
              {/* Input IQ Points */}
              <div className="glass-card p-8 animate-fadeInUp">
                <label className="block text-lg font-medium text-white mb-4">
                  IQ Points
                </label>
                <input
                  type="number"
                  value={iqPoints}
                  onChange={(e) => setIqPoints(e.target.value)}
                  placeholder="Enter your IQ points"
                  className="input-field w-full text-xl"
                  min="0"
                />
              </div>

              {/* Relic Holder Toggle */}
              <div className="glass-card p-8 animate-slideIn">
                <div className="flex items-center justify-between mb-6">
                  <label className="text-lg font-medium text-white">
                    Relic holder
                  </label>
                  <button
                    onClick={() => setHoldRelic(!holdRelic)}
                    className={`toggle-switch ${holdRelic ? 'active' : 'inactive'}`}
                    aria-pressed={holdRelic}
                  >
                    <span className={`toggle-thumb ${holdRelic ? 'active' : 'inactive'}`} />
                  </button>
                </div>

                {/* Interface de sélection des relics */}
                {holdRelic && (
                  <div className="space-y-4 animate-fadeInUp">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">Select your relics</span>
                      <button
                        onClick={resetRelicCounts}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Reset counts
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {RELIC_TYPES.map((relic) => (
                        <div
                          key={relic.id}
                          className={`relic-card ${relic.id}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className={`w-3 h-3 rounded-full bg-${relic.color}-500 mb-1`}></div>
                              <div className="text-sm font-medium text-white">
                                {relic.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                ×{relic.multiplier.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="relic-counter">
                            <button
                              onClick={() => updateRelicCount(relic.id, -1)}
                              className="counter-btn"
                              disabled={relics[relic.id] === 0}
                            >
                              −
                            </button>
                            <span className="text-white font-medium mx-3">
                              {relics[relic.id]}
                            </span>
                            <button
                              onClick={() => updateRelicCount(relic.id, 1)}
                              className="counter-btn"
                            >
                              +
                            </button>
                          </div>
                          
                          {relics[relic.id] > 0 && (
                            <div className="mt-2 text-xs text-center">
                              <span className={`text-${relic.color}-400`}>
                                +{((Math.pow(relic.multiplier, relics[relic.id]) - 1) * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Discord Role Selection */}
              <div className="glass-card p-8 animate-slideIn" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center justify-between mb-6">
                  <label className="text-lg font-medium text-white">
                    Discord Role
                  </label>
                  <button
                    onClick={() => setHasDiscordRole(!hasDiscordRole)}
                    className={`toggle-switch ${hasDiscordRole ? 'active' : 'inactive'}`}
                    aria-pressed={hasDiscordRole}
                  >
                    <span className={`toggle-thumb ${hasDiscordRole ? 'active' : 'inactive'}`} />
                  </button>
                </div>

                {hasDiscordRole && (
                  <div className="space-y-4 animate-fadeInUp">
                    <div className="mb-4">
                      <span className="text-sm text-gray-400">Select your role to get a bonus</span>
                    </div>

                    <div className="role-selector">
                      {DISCORD_ROLES.map((role) => (
                        <div
                          key={role.id}
                          onClick={() => setSelectedDiscordRole(selectedDiscordRole === role.id ? null : role.id)}
                          className={`role-card ${role.id} ${selectedDiscordRole === role.id ? 'selected' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-3 h-3 rounded-full bg-${role.color}-500`}></div>
                            <span className="text-xs text-gray-400">— {role.level}</span>
                          </div>
                          
                          <div className="text-sm font-medium text-white mb-1">
                            {role.name}
                          </div>
                          
                          <div className="text-xs text-gray-400 mb-1">
                            {role.description}
                          </div>
                          
                          {selectedDiscordRole === role.id && (
                            <div className="mt-2 text-xs text-center">
                              <span className={`text-${role.color}-400 font-medium`}>
                                ✓ Selected
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne de droite - Résultats */}
            <div className="space-y-6">
              {/* Boutons d'action */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSimulation}
                  className="btn-primary flex-1"
                  disabled={!iqPoints}
                >
                  🚀 Simulate
                </button>
                <button
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Reset
                </button>
              </div>

              {/* Results */}
              {result && (
                <div className="result-card animate-fadeInUp">
                  <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    📊 Simulation Results
                  </h2>
                  
                  {/* Résultat principal */}
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 mb-6 border border-green-500/30">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">
                        {result.finalTrustTokens.toLocaleString()} TRUST
                      </div>
                      <div className="text-xl text-gray-300">
                        ≈ ${result.totalValueUSD.toFixed(4)} USD
                      </div>
                    </div>
                  </div>

                  {/* Calculation Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-gray-400">Base ({result.iqPoints} IQ pts):</span>
                      <span className="text-white font-medium">{result.baseTrustTokens.toLocaleString()} TRUST</span>
                    </div>
                    
                    {result.totalRelics > 0 && (
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">Relic Bonus (×{result.relicMultiplier.toFixed(3)}):</span>
                        <span className="text-purple-400 font-medium">+{((result.relicMultiplier - 1) * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    
                    {selectedDiscordRole && hasDiscordRole && (
                      <div className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400">
                          {DISCORD_ROLES.find(r => r.id === selectedDiscordRole)?.name} (×{result.discordMultiplier.toFixed(2)}):
                        </span>
                        <span className="text-blue-400 font-medium">+{((result.discordMultiplier - 1) * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4 text-lg font-bold">
                      <span className="text-white">Final Total:</span>
                      <span className="text-green-400">{result.finalTrustTokens.toLocaleString()} TRUST</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="text-xs text-center text-gray-500 pt-4 mt-4 border-t border-white/10">
                    Formula: (IQ ÷ 1000) × 10 × Relic Multiplier × Discord Role Bonus
                  </div>
                </div>
              )}

              {/* Placeholder when no results */}
              {!result && (
                <div className="glass-card p-12 text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">
                    Ready for Simulation
                  </h3>
                  <p className="text-gray-500">
                    Enter your IQ points and click Simulate to see your potential gains
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Warning Message */}
          <div className="text-center mt-8 animate-fadeInUp" style={{animationDelay: '0.35s'}}>
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm">This is a fictional simulator for demonstration purposes only</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-500 text-sm animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <p>Powered by <a href="https://portal.intuition.systems/" className="text-blue-400 hover:text-blue-300 transition-colors">Intuition</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App