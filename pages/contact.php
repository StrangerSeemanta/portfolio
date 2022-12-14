<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,200,1,200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../css/style.css">
    <title>Contact Me -Connect with Shuvo Sarker</title>
</head>
<style>
    section#formSec{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1000;
    }
    form{
        display: flex;
        flex-direction: column;
        z-index: 1000;
    }
    form label{
        color: #fff;
        font-size: 1.5em;
    }
    input{
        font-size: 1.3em;
        margin-bottom: 35px;
        cursor: pointer;
        padding: 5px 10px;
    }
    input .submit{
        background: #000;
    }
    textarea{
        font-size: small;
        outline: none;
        padding: 10px;
        background: transparent;
        margin-bottom: 10px;
        border: none;
        color: orange;
        border-bottom: 3px solid orange;
        resize: none;
    }
</style>
<body class="dark">
    <header>
        <a href="" class="logo">Logo</a>



        <nav>
            <ul>
                <li><a href="../index.html" class="nav-link">Home</a></li>
                <li><a href="" class="nav-link">About Me</a></li>
                <li><a href="" class="nav-link">Works</a></li>
                <li><a href="" class="nav-link active">Contact Me</a></li>
                <li><span class="material-symbols-outlined light"">sunny</span>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="formSec">
            <form name="Form" action="form-handler.php" target="_blank" method="post">
                <label for="username">Enter Your Name: </label>
                <input type="text" name="name"> 

                <label for="pass">Your mail: </label>
                <input type="email" name="email" id="email">

                <label for="message">Your message: </label>
                <textarea name="message" id="message" cols="30" rows="4"></textarea>

                <input name="btn-send" type="submit" value="Submit" class="submit">
            </form>
        </section>
    </main>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"
    integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script defer src="../js/main.js"></script>
</html>