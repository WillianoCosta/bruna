document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão do menu e a lista de navegação
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    // Adiciona um evento de clique ao botão do menu
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' na lista de navegação
            navList.classList.toggle('active');
        });
    }

    // Fecha o menu quando um link é clicado (útil para mobile)
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Adiciona classe 'active' ao link da navegação ao rolar a página
    // Isso é útil para destacar a seção em que o usuário está
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.main-header');
    const navHeight = header ? header.offsetHeight : 0; // Obtém a altura do cabeçalho

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight; // Ajusta para a altura do cabeçalho fixo
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Suaviza a rolagem ao clicar nos links de navegação (já configurado no CSS com scroll-behavior)
    // No entanto, para navegadores mais antigos ou para maior controle, um JS pode ser:
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href').substring(1);
    //         const targetSection = document.getElementById(targetId);
    //         if (targetSection) {
    //             window.scrollTo({
    //                 top: targetSection.offsetTop - navHeight,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });
});