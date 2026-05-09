import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2ZvVaN_ZWrTKvQdWGpdLyt0jb1FHnVp4",
  authDomain: "cardgame-ed26e.firebaseapp.com",
  projectId: "cardgame-ed26e",
  storageBucket: "cardgame-ed26e.firebasestorage.app",
  messagingSenderId: "830034089374",
  appId: "1:830034089374:web:7c00cf947426a813f8b28f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cards = ["🌸", "🌸", "🐰", "🐰", "🍓", "🍓"];

let flippedCards = [];
let matched = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

async function startGame() {
  const studentId =
    document.getElementById("studentId").value;

  const name =
    document.getElementById("name").value;

  if (!studentId || !name) {
    alert("학번과 이름을 입력해줘!");
    return;
  }

  const q = query(
    collection(db, "scores"),
    where("studentId", "==", studentId)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    alert("이미 참여한 학생이야!");
    return;
  }

  document.getElementById("start-screen")
    .style.display = "none";

  const gameBoard =
    document.getElementById("game-board");

  gameBoard.innerHTML = "";

  const shuffled = shuffle([...cards]);

  shuffled.forEach((emoji) => {
    const card = document.createElement("div");

    card.className = "card hidden";
    card.textContent = emoji;

    card.onclick = () => flipCard(card, emoji);

    gameBoard.appendChild(card);
  });
}

async function flipCard(card, emoji) {
  if (
    flippedCards.length < 2 &&
    card.classList.contains("hidden")
  ) {
    card.classList.remove("hidden");

    flippedCards.push({
      card,
      emoji
    });

    if (flippedCards.length === 2) {
      const first = flippedCards[0];
      const second = flippedCards[1];

      if (first.emoji === second.emoji) {
        matched++;
        score++;

        flippedCards = [];

        if (matched === 3) {
          const studentId =
            document.getElementById("studentId").value;

          const name =
            document.getElementById("name").value;

          await addDoc(
            collection(db, "scores"),
            {
              name: name,
              studentId: studentId,
              score: score,
              time: new Date()
            }
          );

          alert(
            name +
            "님의 최종 점수는 " +
            score +
            "점입니다!"
          );
        }

      } else {

        setTimeout(() => {
          first.card.classList.add("hidden");
          second.card.classList.add("hidden");

          flippedCards = [];
        }, 700);

      }
    }
  }
}

window.startGame = startGame;
