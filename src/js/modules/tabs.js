const tabs = (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) => {
        let tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);
    console.log(...activeClass);
    function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            if (item.classList.contains(...activeClass)){
                item.classList.remove(...activeClass);
            }
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(...activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {

        const target = event.target;
        if (target){
            event.preventDefault();
        }
        if (target && (target.classList.contains(tabsSelector.replace(/\./, '')) || 
            target.parentElement.classList.contains(tabsSelector.replace(/\./, ''))) 
            ) {
            tabs.forEach((item, i) => {
                if ((target == item) || (target.parentElement == item)) {
                    hideTabContent();
                    showTabContent(i);
                }
                
                // console.log((target == item) || (target.parentElement == item));
            });
            }

        // console.log(target.parentElement);

        // console.log(target.classList.contains(tabsSelector.slice(1)));
        // console.log(target.parentElement.classList.contains(tabsSelector.slice(1)));
    });


};

export default tabs;