document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão do menu e a lista de navegação
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const mainHeader = document.querySelector('.main-header'); // Seleciona o cabeçalho para possíveis ajustes

    // Função para fechar o menu
    const closeMenu = () => {
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            // Indica que o menu não está expandido para leitores de tela
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Adiciona um evento de clique ao botão do menu
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Adiciona acessibilidade: indica se o menu está expandido
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Fecha o menu quando um link é clicado (útil para mobile)
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Se for um link de âncora, fechar o menu após a navegação
            if (link.getAttribute('href').startsWith('#')) {
                closeMenu();
            }
            // A rolagem suave já está sendo tratada pelo CSS (scroll-behavior: smooth),
            // mas você pode adicionar uma rolagem suave em JS se preferir maior controle.
        });
    });

    // Fecha o menu se clicar fora dele (opcional, mas melhora a UX)
    document.addEventListener('click', (event) => {
        // Verifica se o menu está ativo E se o clique não foi dentro do navList E não foi no menuToggle
        // E também não foi dentro do header (para evitar fechar se clicar no logo, por exemplo)
        if (navList.classList.contains('active') &&
            !navList.contains(event.target) &&
            !menuToggle.contains(event.target) &&
            !mainHeader.contains(event.target)) {
            closeMenu();
        }
    });


    // Adiciona classe 'active' ao link da navegação ao rolar a página
    // Isso é útil para destacar a seção em que o usuário está
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.main-header');
    // Adicionado um pequeno offset extra para garantir que a seção esteja visível
    const navHeight = header ? header.offsetHeight + 10 : 0; // Obtém a altura do cabeçalho

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            // Verifica se a seção está visível na janela de visualização
            const sectionTop = section.offsetTop - navHeight;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Usa includes para pegar links como "#home" quando current é "home"
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
