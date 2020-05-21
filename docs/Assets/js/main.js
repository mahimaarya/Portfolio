// JQuery for Mahima Arya's resume website





// **************** NAVBAR & HOME ************************

$(document).ready(function(){
    // initialize scrollspy
    $('.scrollspy').scrollSpy();

    // animation was a bit excessive
    // ScrollReveal().reveal('h1.ml5', { delay: 200, reset: true });
    // ScrollReveal().reveal('div#publications embed', { beforeReveal: function() {$('div#publications embed').addClass("animated jackInTheBox")} });

    // adapted from http://tobiasahlin.com/moving-letters/
    // an ease in animation for section headings
    anime.timeline({loop: false})
        .add({
            targets: '.ml5 .line',
            opacity: [0.5,1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 700
        }).add({
            targets: '.ml5 .line',
            duration: 600,
            easing: "easeOutExpo",
            translateY: function(e, i, l) {
              var offset = -0.625 + 0.625*2*i;
              return offset + "em";
            }
        }).add({
            targets: '.ml5 .letters-left',
            opacity: [0,1],
            translateX: ["0.5em", 0],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=300'
        }).add({
            targets: '.ml5 .letters-right',
            opacity: [0,1],
            translateX: ["-0.5em", 0],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=600'
        });
        // update the navbar based on where the page began on load
        updateNavbar();
});

// let the flashing arrow on the home page fade away when scrolling down
$(window).scroll(function(){
    $("p#flashing").css("opacity", 1 - $(window).scrollTop() / 400);
  });

// when scrolling or first loading the page, the navbar should update 
// with the current actively viewed section
function updateNavbar() {
    sections = ['#home', '#school', '#skills', '#publications', '#projects', '#leadership', '#work']
    jQuery.each(sections, function(index, section){
        if ($(section).inView()) {
            $('a.active').removeClass('active');
            $( 'a[href*="' + section + '"]' ).addClass('active');
        }
    });
}

// name and navbar fade in when the website is first loaded in
$(window).on('load',function(){ 
    $( ".navbar-fixed h2" ).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},"fast");
    $(".link").each(function(index) {
        $(this).delay(400*index).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},"slow");
    });
});


// **************** SCHOOL ************************

// GPA button and functionality
$(document).on('click', 'a.waves-effect.waves-light.btn-large', function() {
    var d = "div#school h1 a"
    $(d).removeClass("waves-effect");
    $(d).removeClass("waves-light");
    $(d).removeClass("btn-large");
    // GPA incrementer (stops when it hits 3.94)
    // adapted from https://codepen.io/shivasurya/pen/FatiB
    $(d).prop('Counter',0).animate({
        Counter: 394
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(d).text("GPA: " + Math.ceil(now)/100);
        }
    });
});



// **************** SKILLS ************************

// create terminal output feel to skills section
// BUZZ EFFECT BELONGS TO https://codepen.io/cRckls/
var showText = function (target, message, index, interval) {  
    if (index < message.length && $(target).text().indexOf(message) < 0) {
        $(target).append(message[index++]);
        setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
}


// **************** MULTIPLE SECTIONS ************************


// helper function to check whether an element can be viewed in the current window
$.fn.inView = function(){
    if(!this.length) return false;
    var rect = this.get(0).getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

};

// SKILLS AND NAVBAR
// create terminal output in the skills section when the area is viewable
// handle updating the navbar based on the current area in view
$(window).on('scroll',function(){ 
    if( $('#msg1').inView() && $('#msg1').text() === '') {
        // delay the text input so that it feels like someone is actually typing it
        // some text is displayed at the same time to not make the animation too slow
        showText("#msg1", "Mahimas-Resume:~ mahimaarya$ cat mahimas_skills.txt", 0, 20);
        setTimeout(function(){showText("#msg2", "Programming Languages", 0, 20)},1000);
        setTimeout(function(){showText("#msg3", "Python, Node.js, Ruby on Rails", 0, 20)},2000);
        setTimeout(function(){showText("#msg4", "C, Swift, R", 0, 20)},3000);
        setTimeout(function(){showText("#msg5", "Databases", 0, 20)},1000);
        setTimeout(function(){showText("#msg6", "SQL, MongoDB, Redis", 0, 20)},2000);
        setTimeout(function(){showText("#msg7", "Web Development", 0, 20)},1000);
        setTimeout(function(){showText("#msg8", "JavaScript, JQuery, HTML, CSS, GitHub", 0, 20)},2000);
        setTimeout(function(){showText("#msg9", "User Research", 0, 20)},1000);
        setTimeout(function(){showText("#msg10", "Wireframing & Prototyping, Contextual Inquiry", 0, 20)},2000);
        setTimeout(function(){showText("#msg11", "Persona Creation, Storyboarding", 0, 20)},3000);
        setTimeout(function(){showText("#msg12", "Experience Prototyping, Usability Studies", 0, 20)},3000);
    }
    // update the navbar based on scrolling activity
    updateNavbar();

});



