import "./slider";
import modal from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', function() {
    "use strict";

    let modalState = {};

    changeModalState(modalState);
    
    tabs('.glazing_block', '.glazing_content', '.glazing_slider', ['glazing', 'a.active']);
    tabs('.no_click', '.decoration_content > div > div', '.decoration_slider', ['after_click']);
    tabs('.balcon_icons_img', '.big_img > img', '.balcon_icons', ['do_image_more'], 'inline-block'); // > только прямые наследники с тегом img
    forms(modalState);
    modal(modalState);
    timer('.timer1', '2022-06-11');
});


