class VideoQuiz {
  constructor() {
    this.videos = [];
    this.currentIndex = 0;
    this.score = { correct: 0, total: 0 };
    this.userAnswers = [];

    // DOM Elements
    this.welcomeScreen = document.getElementById('welcomeScreen');
    this.quizScreen = document.getElementById('quizScreen');
    this.resultsScreen = document.getElementById('resultsScreen');

    this.startBtn = document.getElementById('startBtn');
    this.videoPlayer = document.getElementById('videoPlayer');
    this.normalBtn = document.getElementById('normalBtn');
    this.anomalyBtn = document.getElementById('anomalyBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.restartBtn = document.getElementById('restartBtn');

    this.currentNum = document.getElementById('currentNum');
    this.totalNum = document.getElementById('totalNum');
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.progressBar = document.getElementById('progressBar');
    this.feedbackContainer = document.getElementById('feedbackContainer');
    this.feedbackContent = document.getElementById('feedbackContent');
    this.feedbackText = document.getElementById('feedbackText');
    this.correctAnswerText = document.getElementById('correctAnswerText');

    this.attachEventListeners();
    this.loadVideos();
  }

  attachEventListeners() {
    this.startBtn.addEventListener('click', () => this.startQuiz());
    this.normalBtn.addEventListener('click', () => this.answer('normal'));
    this.anomalyBtn.addEventListener('click', () => this.answer('anomaly'));
    this.nextBtn.addEventListener('click', () => this.nextVideo());
    this.restartBtn.addEventListener('click', () => this.restart());

    // Auto-play video when it loads
    this.videoPlayer.addEventListener('loadedmetadata', () => {
      this.videoPlayer.play();
    });
  }

  async loadVideos() {
    try {
      const response = await fetch('data/videos.json');
      const data = await response.json();
      this.videos = data.videos;
      console.log(`Loaded ${this.videos.length} videos`);
    } catch (error) {
      console.error('Failed to load videos:', error);
      alert('Fehler beim Laden der Videos. Bitte aktualisieren Sie die Seite.');
    }
  }

  startQuiz() {
    if (this.videos.length === 0) {
      alert('Keine Videos verfügbar. Bitte überprüfen Sie die Datei "data/videos.json".');
      return;
    }

    this.reset();
    this.welcomeScreen.classList.add('hidden');
    this.quizScreen.classList.remove('hidden');
    this.loadVideo();
  }

  reset() {
    this.currentIndex = 0;
    this.score = { correct: 0, total: 0 };
    this.userAnswers = [];
  }

  loadVideo() {
    const video = this.videos[this.currentIndex];
    this.videoPlayer.src = video.path;
    this.videoPlayer.currentTime = 0;

    this.updateProgress();
    this.resetFeedback();
    this.enableAnswerButtons();
  }

  updateProgress() {
    const total = this.videos.length;
    const current = this.currentIndex + 1;

    this.currentNum.textContent = current;
    this.totalNum.textContent = total;
    this.progressBar.value = (current / total) * 100;

    const percentage = this.score.total > 0
      ? Math.round((this.score.correct / this.score.total) * 100)
      : 0;
    this.scoreDisplay.textContent = `Score: ${percentage}%`;
  }

  enableAnswerButtons() {
    this.normalBtn.disabled = false;
    this.anomalyBtn.disabled = false;
    this.normalBtn.classList.remove('btn-primary');
    this.anomalyBtn.classList.remove('btn-primary');
  }

  answer(userAnswer) {
    const video = this.videos[this.currentIndex];
    const isCorrect = userAnswer === video.category;

    this.userAnswers.push({
      video: video.id,
      userAnswer,
      correct: isCorrect
    });

    if (isCorrect) {
      this.score.correct++;
    }
    this.score.total++;

    this.showFeedback(isCorrect, video.category, userAnswer);
    this.disableAnswerButtons(userAnswer, isCorrect);
  }

  showFeedback(isCorrect, correctAnswer, userAnswer) {
    this.feedbackContainer.classList.remove('hidden');

    const answerLabels = {
      'normal': 'Normal',
      'anomaly': 'Anomalie'
    };

    if (isCorrect) {
      this.feedbackContent.classList.remove('alert-error');
      this.feedbackContent.classList.add('alert-success');
      this.feedbackText.innerHTML = `
        <i class="fa-solid fa-check-circle text-lg"></i>
        <span>Richtig!</span>
      `;
      this.correctAnswerText.textContent = '';
    } else {
      this.feedbackContent.classList.remove('alert-success');
      this.feedbackContent.classList.add('alert-error');
      this.feedbackText.innerHTML = `
        <i class="fa-solid fa-times-circle text-lg"></i>
        <span>Falsch!</span>
      `;
      this.correctAnswerText.textContent = `Korrekte Antwort: ${answerLabels[correctAnswer]}`;
    }
  }

  disableAnswerButtons(userAnswer, isCorrect) {
    this.normalBtn.disabled = true;
    this.anomalyBtn.disabled = true;

    // Highlight user's answer
    if (userAnswer === 'normal') {
      this.normalBtn.classList.add(isCorrect ? 'btn-success' : 'btn-error');
    } else {
      this.anomalyBtn.classList.add(isCorrect ? 'btn-success' : 'btn-error');
    }

    // Highlight correct answer if wrong
    if (!isCorrect) {
      const correctBtn = userAnswer === 'normal' ? this.anomalyBtn : this.normalBtn;
      correctBtn.classList.add('btn-success');
    }
  }

  resetFeedback() {
    this.feedbackContainer.classList.add('hidden');
    this.feedbackContent.classList.remove('alert-success', 'alert-error');
    this.normalBtn.classList.remove('btn-success', 'btn-error');
    this.anomalyBtn.classList.remove('btn-success', 'btn-error');
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex < this.videos.length) {
      this.loadVideo();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.quizScreen.classList.add('hidden');
    this.resultsScreen.classList.remove('hidden');

    const percentage = Math.round((this.score.correct / this.score.total) * 100);
    document.getElementById('finalScore').textContent = `${percentage}%`;
    document.getElementById('correctCount').textContent = this.score.correct;
    document.getElementById('wrongCount').textContent = this.score.total - this.score.correct;
    document.getElementById('totalCount').textContent = this.score.total;

    // Message based on score
    let message = '';
    if (percentage === 100) {
      message = 'Perfekt! 🎉';
    } else if (percentage >= 80) {
      message = 'Ausgezeichnet! 🌟';
    } else if (percentage >= 60) {
      message = 'Gute Leistung! 👍';
    } else if (percentage >= 40) {
      message = 'Nicht schlecht! 📈';
    } else {
      message = 'Weiter trainieren! 💪';
    }
    document.getElementById('finalMessage').textContent = message;
  }

  restart() {
    this.resultsScreen.classList.add('hidden');
    this.welcomeScreen.classList.remove('hidden');
  }
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new VideoQuiz();
});
