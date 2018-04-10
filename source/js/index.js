const labels = document.querySelectorAll('.food-form__label');

labels.forEach(label => {
    const element = label;
    const input = document.getElementById(element.getAttribute('for'));
    const isDisabled = input.disabled || false;

    label.addEventListener('click', () => {
        if(!isDisabled && input.checked) {
            if(!element.classList.contains('food-form__label--not-switch-phrase')) {
                element.classList.add('food-form__label--not-switch-phrase');
            }
        }
    });

    label.addEventListener('mouseover', () => {
        if (!isDisabled && !input.checked && !element.classList.contains('food-form__label--not-switch-phrase')) {
            element.classList.add('food-form__label--not-switch-phrase');
        }
    });

    label.addEventListener('mouseout', () => {
        if (!isDisabled && element.classList.contains('food-form__label--not-switch-phrase')) {
            element.classList.remove('food-form__label--not-switch-phrase');
        }
    });
});