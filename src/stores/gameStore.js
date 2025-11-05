import { defineStore } from 'pinia'
import { ref } from 'vue'

const SHAPE_COLORS = [
  '#FBADAD',
  '#E9E9FF',
  '#ABF2CB',
  '#FFEA9D',
  '#C2DEFF'
]

const SHAPES = ['square']

// listas de sons disponíveis (nomes conforme estão em public/sounds/yes e /no)
const YES_SOUNDS = [
  '/sounds/yes/19538__bram__outtakes_ahora_si.wav',
  '/sounds/yes/207631__soundscape_leuphana__20131911_running_board.wav',
  '/sounds/yes/345422__artmasterrich__male_yes_01.wav',
  '/sounds/yes/353103__musamdu__girl-screams-yes.wav',
  '/sounds/yes/426906__dersuperanton__yes-male.aiff',
  '/sounds/yes/516897__marydsava__uh-ha.mp3',
  '/sounds/yes/528957__beetlemuse__correct-answer-thats-right.wav',
  '/sounds/yes/547354__legnalegna55__yep-yep.mp3',
  '/sounds/yes/628182__hfornazari__yeah.wav',
  '/sounds/yes/731597__aromythist__horror-voice-yes.mp3'
]

const NO_SOUNDS = [
  '/sounds/no/242654__reitanna__no.wav',
  '/sounds/no/328916__pfranzen__harsh-person-saying-no.ogg',
  '/sounds/no/351565__bertrof__game-sound-incorrect-organic-violin.wav',
  '/sounds/no/369594__evanboyerman__hard-punch-to-gut-no-effects-only-mixing.wav'
]

export const useGameStore = defineStore('game', () => {
  const totalTime = ref(60) // Tempo total da sessão em segundos
  const timeLeft = ref(totalTime.value)
  const score = ref(0)
  const correctAnswers = ref(0)
  const wrongAnswers = ref(0)
  const currentPattern = ref([])
  const alternatives = ref([])
  const gameStarted = ref(false)
  const gameEnded = ref(false)
  const feedbackMessage = ref('')
  const patternType = ref('') // Para saber o tipo de padrão atual
  // playlists embaralháveis para evitar repetir o mesmo som
  let yesPlaylist = [...YES_SOUNDS]
  let noPlaylist = [...NO_SOUNDS]
  let yesIndex = 0
  let noIndex = 0
  const debugSound = ref({ last: null, status: null })

  function startGame() {
    gameStarted.value = true
    gameEnded.value = false
    timeLeft.value = totalTime.value
    score.value = 0
    correctAnswers.value = 0
    wrongAnswers.value = 0
    feedbackMessage.value = ''
    // embaralhar playlists no começo do jogo
    yesPlaylist = shuffleArray([...YES_SOUNDS])
    noPlaylist = shuffleArray([...NO_SOUNDS])
    yesIndex = 0
    noIndex = 0
    generatePattern()
    startTimer()
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function endGame() {
    gameStarted.value = false
    gameEnded.value = true
    calculateFeedback()
    // Lógica para feedback final
  }

  function generatePattern() {
    patternType.value = 'colors'
    const patternData = generateColorPattern()

    // pattern: array of {shape, color} with last element replaced by '?'
    currentPattern.value = [...patternData.pattern.map(p => ({...p})), '?']
    alternatives.value = patternData.alternatives
  }

  function generateColorPattern() {
    const patternLength = Math.floor(Math.random() * 3) + 3
    // escolher duas cores para o padrão
    const color1 = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)]
    let color2 = color1
    while (color2 === color1) {
      color2 = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)]
    }

    const pattern = Array.from({ length: patternLength }, (_, i) => ({
      shape: 'square',
      color: i % 2 === 0 ? color1 : color2,
    }))

    const correctAnswer = {
      shape: 'square',
      color: patternLength % 2 === 0 ? color1 : color2,
    }

    const alternatives = generateAlternatives(correctAnswer, SHAPES, SHAPE_COLORS)
    return { pattern, correctAnswer, alternatives }
  }

  function generateAlternatives(correctAnswer, shapes, colors) {
    const alts = []
    alts.push(correctAnswer)
    while (alts.length < 5) {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      // evitar duplicatas
      if (!alts.some(a => a.shape === randomShape && a.color === randomColor)) {
        alts.push({ shape: randomShape, color: randomColor })
      }
    }
    return alts.sort(() => Math.random() - 0.5)
  }

  function playCorrectSound() {
    // tocar próximo som da playlist yes
    try {
      const src = yesPlaylist[yesIndex % yesPlaylist.length]
      yesIndex = (yesIndex + 1) % yesPlaylist.length
      debugSound.value.last = src
      debugSound.value.status = 'attempting'
      const audio = new Audio(src)
      audio.play().then(() => {
        debugSound.value.status = 'played'
      }).catch((err) => {
        debugSound.value.status = 'rejected: ' + (err && err.message)
        playBeep(880, 150)
      })
    } catch (e) {
      debugSound.value.status = 'exception: ' + (e && e.message)
      playBeep(880, 150)
    }
  }

  function playWrongSound() {
    try {
      const src = noPlaylist[noIndex % noPlaylist.length]
      noIndex = (noIndex + 1) % noPlaylist.length
      debugSound.value.last = src
      debugSound.value.status = 'attempting'
      const audio = new Audio(src)
      audio.play().then(() => {
        debugSound.value.status = 'played'
      }).catch((err) => {
        debugSound.value.status = 'rejected: ' + (err && err.message)
        playBeep(330, 200)
      })
    } catch (e) {
      debugSound.value.status = 'exception: ' + (e && e.message)
      playBeep(330, 200)
    }
  }

  function playBeep(freq = 440, duration = 150) {
  debugSound.value.last = 'beep:' + freq
  debugSound.value.status = 'played-beep'
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = freq
      o.connect(g)
      g.connect(ctx.destination)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01)
      o.start()
      setTimeout(() => { o.stop(); ctx.close() }, duration)
    } catch (err) {
      console.warn('Unable to play beep fallback', err)
    }
  }

  function checkAnswer(answer) {
    const patternWithoutQuestion = currentPattern.value.slice(0, -1)
    const first = patternWithoutQuestion[0]
    const second = patternWithoutQuestion[1]
    const expected = patternWithoutQuestion.length % 2 === 0 ? first : second

    // answer deve ser um objeto {shape, color}
    if (answer.color === expected.color) {
      correctAnswers.value++
      score.value += 10
      playCorrectSound()
      // próxima rodada
      generatePattern()
      return true
    } else {
      wrongAnswers.value++
      playWrongSound()
      // avançar também para a próxima rodada para manter o fluxo do jogo
      generatePattern()
      return false
    }
  }

  function calculateFeedback() {
    feedbackMessage.value = 'PARABÉNS!<br>SEU DESEMPENHO<br>FOI EXCELENTE!'
  }

  let timer = null
  function startTimer() {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(timer)
        endGame()
      }
    }, 1000)
  }

  return {
    totalTime,
    timeLeft,
    score,
    correctAnswers,
    wrongAnswers,
    currentPattern,
    alternatives,
    gameStarted,
    gameEnded,
    feedbackMessage,
    patternType,
    startGame,
    endGame,
    generatePattern,
    checkAnswer,
  }
})
