import { API_BASE_URL } from '/qr-hunt/config.js'

const TRASH_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'

const els = {
  loginCard: document.getElementById('loginCard'),
  adminCard: document.getElementById('adminCard'),
  rankingCard: document.getElementById('rankingCard'),
  password: document.getElementById('password'),
  loginBtn: document.getElementById('loginBtn'),
  loginMessage: document.getElementById('loginMessage'),
  teamNameInput: document.getElementById('teamNameInput'),
  teamsList: document.getElementById('teamsList'),
  teamsMessage: document.getElementById('teamsMessage'),
  saveTeamsBtn: document.getElementById('saveTeamsBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  phase: document.getElementById('phase'),
  rankingBody: document.getElementById('rankingBody'),
  deleteTeamDialog: document.getElementById('deleteTeamDialog'),
  deleteTeamDialogName: document.getElementById('deleteTeamDialogName'),
  deleteTeamCancel: document.getElementById('deleteTeamCancel'),
  deleteTeamConfirm: document.getElementById('deleteTeamConfirm'),
}

/** @type {{ id: string | null; name: string }[]} */
let localTeams = []

/** @type {number | null} */
let pendingDeleteTeamIndex = null

let stream = null

async function api(path, method = 'GET', body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })
  let payload = {}
  try {
    payload = await res.json()
  } catch (_e) {
    payload = { error: 'Reponse API invalide.' }
  }
  if (!res.ok && !payload.error) {
    payload.error = `Erreur API (${res.status})`
  }
  return payload
}

function setAuthUi(isAuthed) {
  els.loginCard.style.display = isAuthed ? 'none' : 'block'
  els.adminCard.style.display = isAuthed ? 'block' : 'none'
  els.rankingCard.style.display = isAuthed ? 'block' : 'none'
}

function openDeleteTeamDialog(index) {
  const row = localTeams[index]
  if (!row) return
  pendingDeleteTeamIndex = index
  els.deleteTeamDialogName.textContent = row.name
  els.deleteTeamDialog.showModal()
}

function closeDeleteTeamDialog() {
  els.deleteTeamDialog.close()
  pendingDeleteTeamIndex = null
  els.deleteTeamConfirm.disabled = false
}

async function confirmDeleteTeam() {
  if (pendingDeleteTeamIndex === null) return
  const index = pendingDeleteTeamIndex
  const team = localTeams[index]
  if (!team) {
    closeDeleteTeamDialog()
    return
  }

  if (team.id === null) {
    localTeams.splice(index, 1)
    closeDeleteTeamDialog()
    renderTeamsList()
    return
  }

  els.deleteTeamConfirm.disabled = true
  try {
    const res = await api('/admin/team/delete', 'POST', { teamId: team.id })
    if (res.error) {
      els.teamsMessage.textContent = res.error
      els.teamsMessage.classList.add('teams-message--error')
      els.deleteTeamConfirm.disabled = false
      return
    }
    localTeams.splice(index, 1)
    closeDeleteTeamDialog()
    renderTeamsList()
    els.teamsMessage.textContent = ''
    els.teamsMessage.classList.remove('teams-message--error')
    await refreshAdmin()
  } catch (_e) {
    els.teamsMessage.textContent = "Impossible de joindre l'API."
    els.teamsMessage.classList.add('teams-message--error')
    els.deleteTeamConfirm.disabled = false
  }
}

function renderTeamsList() {
  els.teamsList.innerHTML = ''
  localTeams.forEach((row, index) => {
    const li = document.createElement('li')
    li.className = 'team-row'

    const span = document.createElement('span')
    span.className = 'team-name'
    span.textContent = row.name

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'team-delete'
    btn.setAttribute('aria-label', `Supprimer ${row.name}`)
    btn.innerHTML = TRASH_SVG
    btn.addEventListener('click', () => openDeleteTeamDialog(index))

    li.append(span, btn)
    els.teamsList.appendChild(li)
  })
}

/** @returns {boolean} false if duplicate name blocked the add */
function addTeamFromInput() {
  const raw = els.teamNameInput.value
  const name = raw.trim()
  if (!name) return true
  const lower = name.toLowerCase()
  if (localTeams.some((t) => t.name.toLowerCase() === lower)) {
    els.teamsMessage.textContent = 'Une équipe avec ce nom existe déjà.'
    els.teamsMessage.classList.add('teams-message--error')
    return false
  }
  els.teamsMessage.textContent = ''
  els.teamsMessage.classList.remove('teams-message--error')
  localTeams.push({ id: null, name })
  els.teamNameInput.value = ''
  renderTeamsList()
  return true
}

function drawRanking(ranking) {
  const rows = ranking.all || []
  els.rankingBody.innerHTML = rows
    .map((r) => {
      const rank = r.rank ? `#${r.rank}` : '-'
      const arrival = r.reachedTargetAt ? new Date(r.reachedTargetAt).toLocaleTimeString() : '-'
      return `<tr><td>${rank}</td><td>${r.name}</td><td>${r.uniqueFoundCount}/10</td><td>${arrival}</td></tr>`
    })
    .join('')
}

function setPhase(status) {
  const labels = {
    waiting_start: 'attente demarrage (QR0)',
    started: 'jeu en cours',
    finished: 'termine',
  }
  els.phase.textContent = `Phase: ${labels[status] || status}`
}

async function refreshAdmin() {
  try {
    const data = await api('/admin/ranking')
    if (data.error) {
      setAuthUi(false)
      if (data.error !== 'Non authentifie.' && data.error !== 'Non authentifié.') {
        els.loginMessage.textContent = data.error
      }
      return
    }
    setAuthUi(true)
    drawRanking(data.ranking)
    setPhase(data.game.status)
    if (data.teams?.length && localTeams.length === 0) {
      localTeams = data.teams.map((t) => ({ id: t.id, name: t.name }))
      renderTeamsList()
    }
  } catch (_e) {
    setAuthUi(false)
    els.loginMessage.textContent = "Impossible de joindre l'API."
  }
}

async function login() {
  const password = els.password.value
  try {
    const res = await api('/admin/login', 'POST', { password })
    if (res.error) {
      els.loginMessage.textContent = res.error
      return
    }
    els.password.value = ''
    els.loginMessage.textContent = ''
    await refreshAdmin()
    if (els.loginCard.style.display !== 'none') {
      els.loginMessage.textContent = 'Connexion refusee. Verifie le mot de passe et les cookies.'
      return
    }
    subscribeLive()
  } catch (_e) {
    els.loginMessage.textContent = "Impossible de joindre l'API."
  }
}

async function logout() {
  await api('/admin/logout', 'POST')
  if (stream) stream.close()
  stream = null
  if (els.deleteTeamDialog.open) closeDeleteTeamDialog()
  localTeams = []
  renderTeamsList()
  els.teamNameInput.value = ''
  els.teamsMessage.textContent = ''
  els.teamsMessage.classList.remove('teams-message--error')
  setAuthUi(false)
}

async function saveTeams() {
  els.teamsMessage.textContent = ''
  els.teamsMessage.classList.remove('teams-message--error')
  if (!addTeamFromInput()) return
  try {
    const names = localTeams.map((t) => t.name)
    const res = await api('/admin/teams', 'POST', { names })
    if (res.error) {
      els.teamsMessage.textContent = res.error
      els.teamsMessage.classList.add('teams-message--error')
      return
    }
    if (Array.isArray(res.teams)) {
      localTeams = res.teams.map((t) => ({ id: t.id, name: t.name }))
      renderTeamsList()
    }
    els.teamsMessage.textContent = 'Equipes enregistrees.'
    await refreshAdmin()
  } catch (_e) {
    els.teamsMessage.textContent = "Impossible de joindre l'API."
    els.teamsMessage.classList.add('teams-message--error')
  }
}

function subscribeLive() {
  if (stream) stream.close()
  stream = new EventSource(`${API_BASE_URL}/stream`, { withCredentials: true })
  stream.onmessage = () => {
    refreshAdmin()
  }
}

els.teamNameInput.addEventListener('input', () => {
  if (els.teamsMessage.classList.contains('teams-message--error')) {
    els.teamsMessage.textContent = ''
    els.teamsMessage.classList.remove('teams-message--error')
  }
})

els.loginBtn.addEventListener('click', login)
els.logoutBtn.addEventListener('click', logout)
els.saveTeamsBtn.addEventListener('click', saveTeams)

els.deleteTeamCancel.addEventListener('click', closeDeleteTeamDialog)
els.deleteTeamConfirm.addEventListener('click', () => {
  confirmDeleteTeam()
})

els.deleteTeamDialog.addEventListener('click', (e) => {
  if (e.target === els.deleteTeamDialog) closeDeleteTeamDialog()
})

els.deleteTeamDialog.addEventListener('cancel', () => {
  pendingDeleteTeamIndex = null
  els.deleteTeamConfirm.disabled = false
})

refreshAdmin()
