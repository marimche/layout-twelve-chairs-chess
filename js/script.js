// -------------- Слайдер для участников турнира ------------------------------ 
const participantsSlides = document.querySelector('.participants-list__slides'); //track

const participantSlideCount = document.getElementById("participants-list").children?.length;

const prevButtonParticipants = document.getElementById("prev2");
const nextButtonParticipants = document.getElementById("next2");

const slider = document.querySelector('.participants-list');

let autoPlayInterval;
let currentIndexP = 0;

const firstClone = participantsSlides.children[0].cloneNode(true);
const lastClone = participantsSlides.children[participantsSlides.children.length - 1].cloneNode(true);

const а1 = participantsSlides.cloneNode(true);
participantsSlides.appendChild(firstClone);
const а2 = participantsSlides.cloneNode(true);
participantsSlides.insertBefore(lastClone, participantsSlides.children[0]); //перед нулевым (Капабланкой)
const а3 = participantsSlides.cloneNode(true);

const allSlides = Array.from(participantsSlides.children);
const totalSlides = allSlides.length;   // 8

const sliderContent = document.getElementById("slider-buttons__content");

const updatePosition = (animate = true) => {
  if (!animate) {
  participantsSlides.style.transition = 'none';
  } else {
  participantsSlides.style.transition = 'transform 0.3s ease';
  }

  const totalWidth = participantsSlides.getBoundingClientRect().width / participantSlideCount

  const offset = -currentIndexP * totalWidth;
  participantsSlides.style.transform = `translateX(${offset}px)`;
  updateTextContent(currentIndexP);
};

const updateTextContent = (index) => {
  if (index % 6 === 0 ) {
    sliderContent.textContent = participantSlideCount + " / " + participantSlideCount;
  } else {
    sliderContent.textContent = index % 6 + " / " + participantSlideCount;
  }
}
    
currentIndexP = 1;
updatePosition(false);

const next = () => {
  if (currentIndexP>= totalSlides - 1) {
    currentIndexP = 1;
    updatePosition(false);
    setTimeout(() => {
      currentIndexP++;
      updatePosition(true);
    }, 20);
  } else {
    currentIndexP++;
    updatePosition(true);
  }
};

const prev = () => {
  if (currentIndexP <= 0) {
    currentIndexP = totalSlides - 2;
    updatePosition(false);
    setTimeout(() => {
      currentIndexP--;
      updatePosition(true);
    }, 20);
  } else {
    currentIndexP--;
    updatePosition(true);
  }
}

prevButtonParticipants.addEventListener('click', () => {
  prev();
});

nextButtonParticipants.addEventListener('click', () => {
  next();
});

function startAutoPlay() { 
  autoPlayInterval = setInterval(() => {
    next();
  }, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

startAutoPlay();

slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);



// -------------- Слайдер для этапов преображения Васюков ------------------------------
const transformationSlides = document.querySelector('.transformation-list__slides');

const transformationSlideCount = document.getElementById("transformation-list").children?.length;

const prevButtonTransformation = document.getElementById("transformation__prev");
const nextButtonTransformation = document.getElementById("transformation__next");

function goToPoint(index) {
  if (index < 0) {
    index = transformationSlideCount - 1;
  } else if (index >= transformationSlideCount) {
    index = 0;
  }

  currentIndexT = index;
  transformationSlides.style.transform = `translateX(${-index/transformationSlideCount * 100}%)`;
}

function markLabel(activIndex, inactivIndex) {
  const activeLabel = document.getElementById("transformation-list__controls-points").children?.[activIndex];
  const inactiveLabel = document.getElementById("transformation-list__controls-points").children?.[inactivIndex];
  activeLabel.classList.add('active');
  inactiveLabel.classList.remove('active');
}

prevButtonTransformation.addEventListener('click', () => {
  markLabel(currentIndexT - 1, currentIndexT);
  goToPoint(currentIndexT - 1);
});

nextButtonTransformation.addEventListener('click', () => {
  markLabel(currentIndexT + 1, currentIndexT);
  goToPoint(currentIndexT + 1);
});

goToPoint(0);