class Theme{
    static changeTo(mode){
        if (mode === 'dark'){
            document.body.classList.replace('dark','light')
        }

        if(mode == 'light'){
            document.body.classList.replace('light','dark')
        }
    }
    
}
$(document).ready(function () {
    $("span.material-symbols-outlined").click(function () {
        if ($(this).hasClass('light')) {
            $(this).removeClass('light')
            $(this).addClass('dark')
            $(this).html('dark_mode')

            Theme.changeTo('dark')
        } else if ($(this).hasClass('dark')) {
            $(this).removeClass('dark')
            $(this).addClass('light')
            $(this).html('sunny')

            Theme.changeTo('light')
        }
    })
})
