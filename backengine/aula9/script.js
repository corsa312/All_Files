document.addEventListener("DOMContentLoaded", function () {
  const now = new Date();
  const hour = now.getHours();
  const greetingElement = document.getElementById("greeting");
  const imageElement = document.getElementById("greeting-image");
  const body = document.body;

  let greetingText = "";
  let imageUrl = "";
  let timeClass = "";

  if (hour >= 6 && hour < 12) {
    greetingText = "Bom dia!";
    imageUrl = "Imagens/manhã.png";
    timeClass = "morning";
  } else if (hour >= 12 && hour < 18) {
    greetingText = "Boa tarde!";
    imageUrl = "Imagens/tarde.png";
    timeClass = "afternoon";
  } else {
    greetingText = "Boa noite!";
    imageUrl = "Imagens/noite.png";
    timeClass = "night";
  }

  greetingElement.textContent = greetingText;
  imageElement.src = imageUrl;
  imageElement.alt = greetingText;
  body.classList.add(timeClass);
});
