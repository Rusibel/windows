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

function modal(){



    const modalTimerId = setTimeout(() => openModal('.popup', modalTimerId), 60000);

    function bindModal(triggerSelector, modalSelector, modadlCloseSelector, closeClickOverlay = true) {
        const modalTrigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              windows = document.querySelectorAll('[data-modal]');

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                
                openModal(modalSelector);
            });
        });

        modal.addEventListener('click', (e) => {
            if ((e.target === modal || e.target.parentElement.classList.contains(modadlCloseSelector)) && 
            closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
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

    bindModal('.header_btn_wrap_block', '.popup_engineer', 'popup_close');
    bindModal('.phone_link','.popup', 'popup_close');
    bindModal('.glazing_price_btn','.popup_calc', 'popup_calc_close');
    bindModal('.popup_calc_button','.popup_calc_profile', '.popup_calc_profile_close');
    bindModal('.popup_calc_profile_button','.popup_calc_end', '.popup_calc_end_close');
};
export default modal;
export {closeModal};
export {openModal};