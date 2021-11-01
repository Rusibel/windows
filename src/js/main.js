import "./slider";
import modal from './modules/modal';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', function() {
    "use strict";

    let modalState = {};

    changeModalState(modalState);
    modal();
    tabs('.glazing_block', '.glazing_content', '.glazing_slider', ['glazing', 'a.active']);
    tabs('.no_click', '.decoration_content > div > div', '.decoration_slider', ['after_click']);
    tabs('.balcon_icons_img', '.big_img > img', '.balcon_icons', ['do_image_more'], 'inline-block'); // > только прямые наследники с тегом img
    forms(modalState);
});


