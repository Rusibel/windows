function modal(){

    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function openModal(modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (modalTimerId) {
            clearInterval(modalTimerId);
        }
    }

    const modalTimerId = setTimeout(() => openModal('.popup', modalTimerId), 60000);

    function bindModal(triggerSelector, modalSelector) {
        const modalTrigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector);

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }
                
                openModal(modalSelector);
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.parentElement.classList.contains('popup_close') ) {
                closeModal(modalSelector);
                console.log(e.target);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.style.display == 'block') { 
                closeModal(modalSelector);
            }
        });

        // function showModalByScroll() {
        //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        //         openModal(modalSelector);
        //         window.removeEventListener('scroll', showModalByScroll);
        //     }
        // }
        // window.addEventListener('scroll', showModalByScroll);
    }

    bindModal('.header_btn_wrap_block', '.popup_engineer');
    bindModal('.phone_link','.popup');
};
export default modal;
// export {closeModal};
// export {openModal};