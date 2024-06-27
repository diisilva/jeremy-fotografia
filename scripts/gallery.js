let currentImageIndex = 0;
let totalImages = 0;
let images = [];

function loadGalleryImages(pageName, imageCount) {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = ''; // Limpa o conteúdo anterior
    totalImages = imageCount;

    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `images/${pageName}/${i}.jpg`; // Caminho da imagem (considerando a extensão .JPG)
        img.alt = `${pageName} ${i}`; // Texto alternativo para a imagem
        img.classList.add('gallery-img'); // Adiciona uma classe para estilização

        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('col-md-4'); // Classes do Bootstrap para layout
        imgWrapper.appendChild(img);

        galleryContainer.appendChild(imgWrapper);

        images.push(img.src); // Armazena o caminho da imagem no array

        // Adiciona o evento de clique para abrir o modal
        img.addEventListener('click', function () {
            currentImageIndex = i - 1; // Define o índice da imagem atual
            openModal(this.src);
        });
    }
}

// Função para abrir a imagem no modal
function openModal(src) {
    const modalImage = document.getElementById('modalImage');
    const img = new Image();
    img.src = src;
    img.onload = function () {
        modalImage.src = src;
    };
    var myModal = new bootstrap.Modal(document.getElementById('imageModal'), {
        keyboard: true,
        backdrop: 'static' // Isso garante que a página não fique escura ao fechar o modal
    });
    myModal.show();

    // Evento para garantir que a página seja restaurada ao estado original ao fechar o modal
    document.getElementById('imageModal').addEventListener('hidden.bs.modal', function () {
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop').remove();
    });
}

// Função para mostrar a próxima imagem no modal
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    openModal(images[currentImageIndex]);
}

// Função para mostrar a imagem anterior no modal
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    openModal(images[currentImageIndex]);
}

// Função para expandir a notícia ao clicar em "Leia mais"
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const cardBody = button.parentElement;
        const shortText = cardBody.querySelector('.short-text');
        const fullText = cardBody.querySelector('.full-text');

        if (shortText.style.display === 'none') {
            shortText.style.display = 'block';
            fullText.style.display = 'none';
            button.textContent = 'Leia mais';
        } else {
            shortText.style.display = 'none';
            fullText.style.display = 'block';
            button.textContent = 'Mostrar menos';
        }
    });
});

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = `
        <footer class="footer bg-dark text-white text-center py-3">
            <section class="container mt-5 section-black-bg">
                <h2 class="text-center mb-4">Facilidade e redes sociais</h2>
                <div class="row my-4">
                    <div class="col-4 my-2 text-center">
                        <div class="icone-facilidade">
                            <img src="./images/pix_2.png" alt="Ícone PAGUE PELO PIX" class="img-fluid">
                        </div>
                        <h3>PAGUE PELO PIX</h3>
                        <p>Ganhe 5% OFF em pagamentos via PIX</p>
                    </div>
                    <div class="col-4 my-2 text-center">
                        <div class="icone-facilidade">
                            <a href="https://www.instagram.com/jeremydiasfotografia" target="_blank">
                                <img src="./images/instagram_2.png" alt="Ícone Instagram" class="img-fluid">
                            </a>
                        </div>
                        <h3>Instagram</h3>
                        <p>Siga-me no Instagram para ver as últimas fotos e atualizações</p>
                    </div>
                    <div class="col-4 my-2 text-center">
                        <div class="icone-facilidade">
                            <a href="https://www.facebook.com/jeremy.diasii" target="_blank">
                                <img src="./images/facebook_2.png" alt="Ícone Facebook" class="img-fluid">
                            </a>
                        </div>
                        <h3>Facebook</h3>
                        <p>Curta minha página no Facebook e fique por dentro das novidades</p>
                    </div>
                </div>
                <div class="newsletter text-center">
                    <h4>Quer receber novidades sobre mim, promoções exclusivas ou entrar em contato comigo?</h4>
                    <form onsubmit="event.preventDefault(); sendEmail();">
                        <input type="email" class="form-control my-2" placeholder="Digite seu email" id="emailField">
                        <textarea class="form-control my-2" placeholder="Digite sua mensagem" id="messageField"></textarea>
                        <button type="submit" class="btn btn-primary mt-2">Enviar</button>
                    </form>
                </div>
            </section>
            <p>2024 © Desenvolvido por WCache Solutions | Projeto de extensão da Universidade do Vale do Itajaí.</p>
        </footer>
    `;
}

function sendEmail() {
    const emailField = document.getElementById('emailField');
    const messageField = document.getElementById('messageField');
    const email = emailField.value;
    const message = messageField.value;

    if (email && message) {
        emailjs.send("service_axm9oxq", "template_6wkdbqo", {
            to_email: email,
            message: `O usuário com o email ${email} enviou a mensagem : ${message}`,
        })
        .then((response) => {
            alert('Email enviado com sucesso!');
            emailField.value = '';
            messageField.value = '';
        }, (error) => {
            alert('Ocorreu um erro ao enviar o email:', error);
        });
    } else {
        alert('Por favor, insira um email e uma mensagem válidos.');
    }
}
