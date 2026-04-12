import { API_BASE_URL } from '/qr-hunt/config.js'

const sessionId = localStorage.getItem('qrHuntSessionId') || crypto.randomUUID()
localStorage.setItem('qrHuntSessionId', sessionId)

const state = {
  team: null,
  stream: null,
  cameraStream: null,
}

const els = {
  teamName: document.getElementById('teamName'),
  identifyBtn: document.getElementById('identifyBtn'),
  teamStatus: document.getElementById('teamStatus'),
  camera: document.getElementById('camera'),
  startCamBtn: document.getElementById('startCamBtn'),
  scanBtn: document.getElementById('scanBtn'),
  manualCode: document.getElementById('manualCode'),
  manualBtn: document.getElementById('manualBtn'),
  gamePhase: document.getElementById('gamePhase'),
  scoreLine: document.getElementById('scoreLine'),
  messageLine: document.getElementById('messageLine'),
}

function setTeamStatus(text, variant) {
  els.teamStatus.textContent = text
  els.teamStatus.classList.remove('team-status--success', 'team-status--error')
  if (variant === 'success') els.teamStatus.classList.add('team-status--success')
  else if (variant === 'error') els.teamStatus.classList.add('team-status--error')
}

function setMessageLine(text, variant) {
  els.messageLine.textContent = text
  els.messageLine.classList.remove('message-line--success', 'message-line--error')
  if (variant === 'success') els.messageLine.classList.add('message-line--success')
  else if (variant === 'error') els.messageLine.classList.add('message-line--error')
}

function updateActionState() {
  const hasTeam = Boolean(state.team?.id)
  const hasCamera = Boolean(state.cameraStream)
  els.scanBtn.disabled = !(hasTeam && hasCamera)
}

function phaseLabel(status) {
  if (status === 'waiting_start') return 'Phase: attente de toutes les équipes (QR0)...'
  if (status === 'started') return 'Phase: jeu en cours...'
  if (status === 'finished') return 'Phase: jeu terminé!'
  return `Phase: ${status}`
}

async function api(path, method = 'GET', body) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

async function refresh() {
  if (!state.team) return
  const data = await api(`/state?teamId=${encodeURIComponent(state.team.id)}`)
  els.gamePhase.textContent = phaseLabel(data.game.status)
  const found = data.team?.uniqueFoundCount || 0
  els.scoreLine.textContent = `${found}/10`
}

async function identifyTeam() {
  const teamName = els.teamName.value.trim()
  if (!teamName) return
  const payload = await api('/identify', 'POST', { teamName, sessionId })
  if (payload.error) {
    setTeamStatus(payload.error, 'error')
    return
  }
  state.team = payload.team
  localStorage.setItem('qrHuntTeamId', state.team.id)
  localStorage.setItem('qrHuntTeamName', state.team.name)
  setTeamStatus(`Équipe active : ${state.team.name}`, 'success')
  updateActionState()
  await refresh()
}

async function sendCode(code) {
  if (!state.team) {
    setMessageLine("Identifie d'abord ton équipe.", 'error')
    return
  }
  const payload = await api('/scan', 'POST', { teamId: state.team.id, code })
  const text = payload.message || payload.error || 'Réponse reçue.'
  if (payload.error) {
    setMessageLine(text, 'error')
  } else if (payload.duplicate) {
    setMessageLine(text, null)
  } else {
    setMessageLine(text, 'success')
  }
  if (!payload.error && navigator.vibrate) {
    navigator.vibrate(40)
  }
  await refresh()
}

async function startCamera() {
  if (state.cameraStream) return
  try {
    state.cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    })
    els.camera.srcObject = state.cameraStream
    els.startCamBtn.textContent = 'Caméra active'
    updateActionState()
  } catch (_e) {
    setMessageLine('Caméra indisponible, veuillez utiliser le champ manuel.', 'error')
  }
}

async function scanOnce() {
  if (!('BarcodeDetector' in window)) {
    setMessageLine('Scanner natif non disponible, veuillez utiliser le champ manuel.', 'error')
    return
  }
  if (!state.cameraStream) {
    setMessageLine("Veuillez d'abord activer la caméra.", 'error')
    return
  }
  const detector = new BarcodeDetector({ formats: ['qr_code'] })
  const codes = await detector.detect(els.camera)
  if (!codes.length) {
    setMessageLine('Aucun QR détecté, veuillez réessayer.', 'error')
    return
  }
  const value = String(codes[0].rawValue || '').trim().toUpperCase()
  await sendCode(value)
}

function subscribeLive() {
  if (state.stream) state.stream.close()
  state.stream = new EventSource(`${API_BASE_URL}/stream`, { withCredentials: true })
  state.stream.onmessage = () => {
    refresh()
  }
}

function hydrateTeam() {
  const teamId = localStorage.getItem('qrHuntTeamId')
  const teamName = localStorage.getItem('qrHuntTeamName')
  if (teamId && teamName) {
    state.team = { id: teamId, name: teamName }
    setTeamStatus(`Équipe active : ${teamName}`, 'success')
  }
  updateActionState()
}

els.identifyBtn.addEventListener('click', identifyTeam)
els.teamName.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') identifyTeam()
})
els.startCamBtn.addEventListener('click', startCamera)
els.scanBtn.addEventListener('click', scanOnce)
els.manualBtn.addEventListener('click', async () => {
  const code = els.manualCode.value.trim().toUpperCase()
  if (!code) return
  await sendCode(code)
  els.manualCode.value = ''
})

hydrateTeam()
refresh()
subscribeLive()
