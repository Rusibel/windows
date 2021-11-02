function modal(state){  
    function bindModal(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay = true) {
        const modalTrigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              windows = document.querySelectorAll('[data-modal]'),
              close = document.querySelector(modalCloseSelector),
              scroll = calcScroll();

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });


        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.overflow = ""; 
                document.body.style.marginRight = `0px`;
            }
        });
        
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.style.display == 'block') { 
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    let errorMessage = document.createElement('div');
        errorMessage.classList.add('status');
        document.querySelector('.popup_calc_content').append(errorMessage);
        document.querySelector('.popup_calc_profile_content').append(errorMessage);

    function checkInputsData(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay, examProps1, examProps2, examProps3 = true,){     
            if (examProps1 && examProps2 && examProps3) {            
                bindModal(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay);
                document.querySelector(triggerSelector).textContent = 'Далее';     
                document.querySelector(triggerSelector).classList.remove('status');    
            } else {              
                document.querySelector(triggerSelector).textContent = 'Сделайте свой выбор';     
                document.querySelector(triggerSelector).classList.add('status');   
                document.querySelector(triggerSelector).removeEventListener('click');       
            }
    } 

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    document.querySelector('.popup_calc_button').addEventListener('mouseover', () => {
        checkInputsData('.popup_calc_button','.popup_calc_profile', '.popup_calc_profile_close', false, state.form, state.width, state.height);
    });

    document.querySelector('.popup_calc_profile_button').addEventListener('mouseover', () => {
        checkInputsData('.popup_calc_profile_button','.popup_calc_end', '.popup_calc_end_close', false, state.type, state.profile);
    });

    

    bindModal('.header_btn_wrap_block', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link','.popup', '.popup .popup_close');


    bindModal('.glazing_price_btn','.popup_calc', '.popup_calc_close');
    // bindModal('.popup_calc_button','.popup_calc_profile', '.popup_calc_profile_close', false);
    // bindModal('.popup_calc_profile_button','.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup', 60000);
};
export default modal;
