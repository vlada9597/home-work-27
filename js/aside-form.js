const form = document.getElementById('commentForm');
const commentsContainer = document.getElementById('comments');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = emailInput.value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!isValidEmail(email)) {
        emailError.textContent = "Enter the correct email!";
        emailInput.focus();
        return;
    } else {
        emailError.textContent = "";
    }

    if (!name || !comment) {
        alert("Name and comment cannot be empty.");
        return;
    }

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `<strong>${name}</strong> <span class="email">(${email})</span><p>${comment}</p>`;
    commentsContainer.appendChild(commentDiv);
    form.reset();
});

emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value.trim())) {
        emailError.textContent = "";
    }
});
