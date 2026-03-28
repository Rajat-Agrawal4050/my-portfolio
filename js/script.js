
(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init("Ya9XNwwxWCTNx72ib");  // your email js public key
})();

const name1 = document.getElementById('name');
const email = document.getElementById('email');
const msg = document.getElementById('message');

const navbar = document.getElementById('menu_div');

const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

['keyup', 'blur'].forEach((e) => {
    name1.addEventListener(e, (event) => {
        // console.log(event.target.nodeName);
        if (name1.value == '') {
            name1.style.border = '2px solid red';
            name1.style.boxShadow = 'none';
            document.getElementById('name_error').style.display = 'block';
            name1.style.margin = '0';
        }
        else {
            name1.style.border = '1px solid var(--dark-slate)';
            document.getElementById('name_error').style.display = 'none';
        }
    });
});

['keyup', 'blur'].forEach((e) => {
    email.addEventListener(e, (event) => {

        if (regex.test(email.value)) {
            email.style.border = '1px solid var(--dark-slate)';
            document.getElementById('email_error').style.display = 'none';
        }
        else {
            email.style.border = '2px solid red';
            email.style.boxShadow = 'none';
            document.getElementById('email_error').style.display = 'block';
            email.style.margin = '0';
        }
    });
});

['keyup', 'blur'].forEach((e) => {
    msg.addEventListener(e, (event) => {
        if (msg.value == '') {
            msg.style.border = '2px solid red';
            msg.style.boxShadow = 'none';
            document.getElementById('message_error').style.display = 'block';
            msg.style.margin = '0';
        }
        else {
            msg.style.border = '1px solid var(--dark-slate)';
            document.getElementById('message_error').style.display = 'none';
        }
    });
});

function func(el) {

    const list = document.querySelectorAll('.company_list ul li');

    list.forEach((li, index) => {
        li.classList.remove('active');
    });
    el.classList.add('active');
}

function func2(el) {
    let txt = el.getAttribute('data-click-id');
    document.getElementById(txt).click();
    console.log('clicked')
}


const btn = document.querySelector('#hamburger_btn');
btn.addEventListener('click', () => {

    // Toggle Menu Stuff

    const lines = document.querySelectorAll('#hamburger_btn > ul > li');

    lines.forEach((line, index) => {
        line.style.transformOrigin = '30% 68%';
        line.classList.toggle('transform');

    });

    document.body.classList.toggle('stop-scrolling');
    document.getElementById('menu_div').classList.toggle('menu-change');

    document.getElementById('content').classList.toggle('content-blur');

    const menu_area = document.getElementById('menu_area');
    menu_area.classList.toggle('menu-area-change');

    menu_area.style.width = '100%';

    const lis = document.querySelectorAll('#menu_area > ul > li');

    lis.forEach((li, index) => {

        li.classList.toggle('menu-area-li-change');
        li.style.animation = 'none';
        li.style.opacity = '1';
    });

    const links = document.querySelectorAll('#menu_area > ul > li a');

    links.forEach((link, index) => {

        link.classList.toggle('menu-area-a-change');
    });
    $('#menu_area').toggle();
});


const new_list = document.querySelectorAll('#menu_area > ul > li a');

new_list.forEach((a, index) => {

    a.addEventListener('click', () => {


        new_list.forEach((item, index) => {
            item.classList.remove('active');
        });
        a.classList.add('active');

        const ham_btn = document.querySelector('#hamburger_btn');
        const style = getComputedStyle(ham_btn);

        if (style.display == 'block')
            btn.click();

    });

});

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        // downscroll code
        navbar.style.top = '-70px';
    } else if (st < lastScrollTop) {
        // upscroll code
        navbar.style.top = '0';
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


const viewBtn = document.getElementById('viewBtn');
let startIndex = 4;

viewBtn.onclick = () => {

    let boxes = document.querySelectorAll('.pr_container .pr_col');

    for (var i = startIndex; i < startIndex + 4; i++) {
        if (boxes[i] === undefined)
            continue;
        boxes[i].style.display = 'flex';
    }
    startIndex += 4;
    if (startIndex >= boxes.length) {
        viewBtn.style.display = 'none';
    }
}

document.getElementById('myForm').addEventListener('submit', (event) => {
    event.preventDefault();

    let div = document.getElementById('alert_div');

    let form = document.getElementById('myForm');
    // console.log(form.name.value)
    // return

    if (form.name.value == '') {

        div.innerHTML = '<div class="alert1 alert-danger1" style="display:none !important;" id="NameErr" role="alert">Enter Your Name</div>';
        $('#NameErr').fadeIn(500).delay(3000).fadeOut(3000);
        return;
    }
    if (!regex.test(form.email.value)) {

        div.innerHTML = '<div class="alert1 alert-danger1" style="display:none !important;" id="EmailErr" role="alert">Invalid E-mail Address</div>';
        $('#EmailErr').fadeIn(500).delay(3000).fadeOut(3000);
        return;
    }
    if (form.message.value == '') {

        div.innerHTML = '<div class="alert1 alert-danger1" style="display:none !important;" id="MsgErr" role="alert">Please Enter Message</div>';
        $('#MsgErr').fadeIn(500).delay(3000).fadeOut(3000);
        return;
    }
    let body = "Name :" + name1.value + "<br/> Email :" + email.value + "<br/> Message :" + msg.value;

    const templateParams= {
        name: form.name.value,
        email: form.email.value,
        title: form.title.value,
        message: form.message.value,
    }
    // these IDs from the previous steps
    emailjs.sendForm('service_tjabnnq', 'template_horgz8h', form)
        .then(() => {
            console.log('SUCCESS!');
              div.innerHTML = '<div class="alert1 alert-success1" style="display:none !important;" id="NameErr" role="alert">Success !</div>';
        $('#NameErr').fadeIn(500).delay(3000).fadeOut(3000);
        form.name.value='';
        form.email.value='';
        form.message.value='';
        }, (error) => {
            console.log('FAILED...', error);
              div.innerHTML = '<div class="alert1 alert-danger1" style="display:none !important;" id="NameErr" role="alert">Something went wrong</div>';
        $('#NameErr').fadeIn(500).delay(3000).fadeOut(3000);
        });


});