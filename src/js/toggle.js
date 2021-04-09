const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.querySelector('#toggle-icon');
const nav = document.querySelector('nav#navbar');

function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.remove('fa-sun');
    toggleIcon.children[1].classList.add('fa-moon');
    toggleSwitch.checked = true
}

function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.remove('fa-moon');
    toggleIcon.children[1].classList.add('fa-sun');
    toggleSwitch.checked = false
}

function toggleTheme(isDark){
    if(isDark){
        document.documentElement.setAttribute('data-theme','dark')
        localStorage.setItem('theme','dark');
        darkMode()
    }else{
        document.documentElement.setAttribute('data-theme','light')
        localStorage.setItem('theme','light');
        lightMode()
    }
}

function switchTheme({target:{checked}}){
    if(checked){
        toggleTheme(true)
    }else{
        toggleTheme(false)
    } 
}

toggleSwitch.addEventListener('change',switchTheme)
toggleTheme(localStorage.getItem('theme') === "dark")

