import {postData} from '../services/services';
import {closeModal, openModal} from './modal';

function forms(formsSelector){
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: 'идет отправка',
        success: 'отправлено',
        failure: 'ошибка'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            function statusMessage(message) {
            let status = document.createElement('div');
            status.classList.add('statusMessage');
            status.innerHTML = `
            <p class="form_notice">${message}</p>
            `;
            form.append(statusMessage(message.loading));
            }
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                statusMessage.remove();
                statusMessage(message.success);
                // message.loading.remove();
            }).catch(() => {
                form.insertAdjacentHTML('beforeend', message.failure);
            }).finally(() => {
                form.reset();
                statusMessage.remove()
            });
        });
    }

    function showThanksModal(message) {
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;