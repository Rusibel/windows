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

    function getDynamicInformation(selector) {
        const input = selector.getElementsByName('user_phone');

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }

        });
    }

    function bindPostData(form) {

        getDynamicInformation(form.replace(/\.\'/g, ''));

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let status = message.loading;

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('statusMessage');
            statusMessage.innerHTML = `
            <p class="form_notice">${status}</p>
            `;
            form.insertAdjacentElement('beforeend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                // statusMessage.remove();
                showThanksModal(message.success);
                form.insertAdjacentElement('beforeend', statusMessage);
            }).catch(() => {
                // statusMessage.remove();
                showThanksModal(message.failure);
                form.insertAdjacentElement('beforeend', statusMessage);
            }).finally(() => {
                form.reset();
                statusMessage.remove();
            });
        });
        
        function showThanksModal(message) {

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('form_notice');
            thanksModal.innerHTML = `
                <p class="form_notice">${message}</p>
            `;
            form.insertAdjacentElement('beforeend', thanksModal);
            setTimeout(() => {
                thanksModal.remove();
            }, 4000);
        }
    }
}

export default forms;