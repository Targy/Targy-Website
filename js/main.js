var display_flag = 1;
var in_GE = false;
            
var fade_in_out_once = document.getElementsByClassName("fade-in-out");
var home_sections = document.getElementsByTagName("section");
var home_nav = document.getElementsByTagName("header");
var home_footer = document.getElementsByTagName("footer");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// let first = new Promise(function(resolve, reject) {

//     home_nav[0].style.display = "none";
//     home_sections[0].style.display = "none";
//     home_footer[0].style.display = "none";
//     setTimeout(resolve, 4000);}).then(function() {
//         fade_in_out_once[0].style.display = "none";
//         home_nav[0].style.display = "block";
//         home_sections[0].style.display = "block";
//         home_footer[0].style.display = "block";

//         home_nav[0].classList.add("fade-in");
//         home_sections[0].classList.add("fade-in");
//         home_footer[0].classList.add("fade-in");
// });

// add back!!!!! 1
home_nav[0].style.display = "none";
home_sections[0].style.display = "none";
home_footer[0].style.display = "none";

animationend_in_flag = true;
animationend_out_flag = false;


function fade_in_out_once_animation(){
    fade_in_out_once[0].style.display = "none";
    home_nav[0].style.display = "block";
    home_sections[0].style.display = "block";
    home_footer[0].style.display = "block";

    home_nav[0].classList.add("fade-in");
    home_sections[0].classList.add("fade-in");
    home_footer[0].classList.add("fade-in");
}

// add back!!!!! 2
fade_in_out_once[0].addEventListener("animationend", fade_in_out_once_animation, true);


// fade_in_out_once[0].removeEventListener("animationend", fade_in_out_once_animation, true);


// function to_project(){
//     const myPromise = new Promise(function(myResolve, myReject) {
//         myResolve(to_project_detail());
//         console.log(current_event_target)
//     });
    
//     myPromise.then(function() {
//         console.log(current_event_target);
//         current_event_target.removeEventListener("animationend", animationend, true);
//     });
// }

function animationend(current_ele, new_ele){
    current_ele.style.display = "none";
    new_ele.style.display = "block";
    new_ele.classList.add("ease-in-right");
    current_ele.classList.remove("current_display");
    new_ele.classList.add("current_display");
}


function to_project(){

    var current_display = document.getElementsByClassName("current_display");
    var project_content = document.getElementsByClassName("project_display")

    current_display[0].classList.remove("ease-in-right");
    current_display[0].classList.add("ease-out-left");
    project_content[0].classList.remove("ease-out-left");
    
    

    // function animationend(){
    //     current_display[0].style.display = "none";
    //     project_content[0].style.display = "block";
    //     project_content[0].classList.add("ease-in-right");
    //     current_display[0].classList.remove("current_display");
    //     project_content[0].classList.add("current_display");
    //     current_event_target = this;
    //     console.log(current_event_target);
    // }
    setTimeout(() => {
        current_display[0].addEventListener("animationend", animationend(current_display[0], project_content[0]), true);
    }, "1300")
    // console.log(current_display[0].getAttribute("listener"));
    // current_display[0].removeEventListener("animationend", animationend, true);

    let old_nav = document.getElementsByClassName("active");
    old_nav[0].classList.remove("active");

    let new_nav = document.getElementById("project_nav");
    new_nav.classList.add("active");
}

function to_home(){
    var current_display = document.getElementsByClassName("current_display");
    var home_content = document.getElementsByClassName("home_display")

    current_display[0].classList.remove("ease-in-right");
    current_display[0].classList.add("ease-out-left");
    home_content[0].classList.remove("ease-out-left");

    // function animationend(){
    //     current_display[0].style.display = "none";
    //     home_content[0].style.display = "block";
    //     home_content[0].classList.add("ease-in-right");
    //     current_display[0].classList.remove("current_display");
    //     home_content[0].classList.add("current_display");
    // }

    setTimeout(() => {
        current_display[0].addEventListener("animationend", animationend(current_display[0], home_content[0]), true);
    }, "1300")
    

    // setTimeout(() => {
    //     current_display[0].removeEventListener("animationend", animationend(), true);
    // }, "1000")
    

    let old_nav = document.getElementsByClassName("active");
    old_nav[0].classList.remove("active");

    let new_nav = document.getElementById("home_nav");
    new_nav.classList.add("active");
}

function to_contact(){
    var current_display = document.getElementsByClassName("current_display");
    var contact_content = document.getElementsByClassName("contact_display");

    current_display[0].classList.remove("ease-in-right");
    current_display[0].classList.add("ease-out-left");
    contact_content[0].classList.remove("ease-out-left");

    setTimeout(() => {
        current_display[0].addEventListener("animationend", animationend(current_display[0], contact_content[0]), true);
    }, "1300")

    let old_nav = document.getElementsByClassName("active");
    old_nav[0].classList.remove("active");

    let new_nav = document.getElementById("contact_nav");
    new_nav.classList.add("active");
}



function filterProjectsByCategory(category) {
    var projectSections = document.getElementsByClassName("project-container");
    if (in_GE) {
        fadeOutAndFadeIn(document.getElementsByClassName("nonGE"));
        in_GE = false;
    }
    else {
        if (category === "GE") {
            fadeOutAndFadeIn(document.getElementsByClassName("GEContent"));
            in_GE = true;
            return;
        }
    }

    for (var i = 0; i < projectSections.length; i++) {
        var categories = projectSections[i].getAttribute("data-categories").split(",");

        if (category === "all" || categories.includes(category)) {
            projectSections[i].style.display = "flex";
            projectSections[i].classList.add("current_display_category");
        } else {
            projectSections[i].style.display = "none";
            projectSections[i].classList.add("current_display_category");
        }
    }
}


const categoryTags = document.getElementsByClassName("category-tag");
for (const tag of categoryTags) {
    tag.addEventListener("click", function () {
        const selectedCategory = this.dataset.category;

        // Remove "active" class from all category tags
        for (const otherTag of categoryTags) {
            otherTag.classList.remove("active");
        }



         // Add "active" class to the clicked category tag
         this.classList.add("active");

        // Filter projects based on the selected category
        filterProjectsByCategory(selectedCategory);
    });
}


function fadeOutAndFadeIn(targetContent) {
    if (in_GE) {
        var currentDisplay = document.getElementsByClassName("GEContent");
    }
    else {
        var currentDisplay = document.getElementsByClassName("nonGE");
    }
    
     currentDisplay[0].classList.remove("fade-in");
     currentDisplay[0].classList.add("fade-out");
    

    setTimeout(function () {
        currentDisplay[0].style.display = "none";
        
         targetContent[0].style.display = "inline-block";
         targetContent[0].classList.add("fade-in");
         targetContent[0].classList.add("current_display_category");

    }, 1300);

   
}



// function to_project(){
//     switch(display_flag) {
//         case 1:
//             var old_content = document.getElementsByClassName("home_display");
//             for(let i = 0; i < old_content.length; i++){
//                 old_content[i].classList.remove("ease-in-right");
//                 old_content[i].classList.add("ease-out-left");
//                 setTimeout(function() {
//                     old_content[i].style.display = "none";
//                 }, 1500);
//             }

//             var old_nav = document.getElementById("home_nav");
//             old_nav.classList.remove("active");
            
//             // old_content.classList.add("ease-out-left");
//             var new_content = document.getElementsByClassName("project_display");
//             setTimeout(function() {
//                 for(let i = 0; i < new_content.length; i++){
//                 new_content[i].style.display = "block";
//                 new_content[i].classList.remove("ease-out-left");
//                 new_content[i].classList.add("ease-in-right");
//                 }
//             }, 1500);
            
//             var new_nav = document.getElementById("project_nav");
//             new_nav.classList.add("active");

//             display_flag = 2;
//             break;
//         case 3:
//         var old_content_title = document.getElementsByClassName("contact_display_title");
//             var old_content_content = document.getElementsByClassName("contact_display_content");
            
//             old_content_title[0].classList.remove("ease-in-right");
//             old_content_content[0].classList.remove("animation-target");
//             old_content_title[0].classList.add("ease-out-left");
//             old_content_content[0].classList.add("ease-out-left");

//             setTimeout(function() {
//                 old_content_title[0].style.display = "none";
//                 old_content_content[0].style.display = "none";
//             }, 1500);

//             var old_nav = document.getElementById("contact_nav");
//             old_nav.classList.remove("active");
            
//             // old_content.classList.add("ease-out-left");
//             var new_content = document.getElementsByClassName("project_display");
//             setTimeout(function() {
//                 for(let i = 0; i < new_content.length; i++){
//                 new_content[i].style.display = "block";
//                 new_content[i].classList.remove("ease-out-left");
//                 new_content[i].classList.add("ease-in-right");
//                 }
//             }, 1500);

//             var new_nav = document.getElementById("project_nav");
//             new_nav.classList.add("active");

//             display_flag = 2;
//             break;
//         default:
//             break;
//     }
// }

// function to_home(){
//     switch(display_flag) {
//         case 2:
//             var old_content = document.getElementsByClassName("project_display");
//             for(let i = 0; i < old_content.length; i++){
//                 old_content[i].classList.remove("ease-in-right");
//                 old_content[i].classList.add("ease-out-left");
//                 setTimeout(function() {
//                     old_content[i].style.display = "none";
//                 }, 1500);
//             }

//             var old_nav = document.getElementById("project_nav");
//             old_nav.classList.remove("active");
            
//             // old_content.classList.add("ease-out-left");
//             var new_content = document.getElementsByClassName("home_display");
            
//             setTimeout(function() {
//                 for(let i = 0; i < new_content.length; i++){
//                 new_content[i].style.display = "block";
//                 new_content[i].classList.remove("ease-out-left");
//                 new_content[i].classList.add("ease-in-right");
//                 }
//             }, 1500);
            

//             var new_nav = document.getElementById("home_nav");
//             new_nav.classList.add("active");

//             display_flag = 1;
//             break;
//         case 3:
//             var old_content_title = document.getElementsByClassName("contact_display_title");
//             var old_content_content = document.getElementsByClassName("contact_display_content");
            
//             old_content_title[0].classList.remove("ease-in-right");
//             old_content_content[0].classList.remove("animation-target");

//             old_content_title[0].classList.add("ease-out-left");
//             old_content_content[0].classList.add("ease-out-left");
            
//             setTimeout(function() {
//                 old_content_title[0].style.display = "none";
//                 old_content_content[0].style.display = "none";
//             }, 1500);

//             var old_nav = document.getElementById("contact_nav");
//             old_nav.classList.remove("active");
            
//             // old_content.classList.add("ease-out-left");
//             var new_content = document.getElementsByClassName("home_display");
//             setTimeout(function() {
//                 for(let i = 0; i < new_content.length; i++){
//                     new_content[i].style.display = "block";
//                     new_content[i].classList.remove("ease-out-left");
//                     new_content[i].classList.add("ease-in-right");
//                 }
//             }, 1500);

//             var new_nav = document.getElementById("home_nav");
//             new_nav.classList.add("active");

//             display_flag = 1;
//             break;
//         default:
//             break;
//     }
// }

// function to_contact(){
//     switch(display_flag) {
//         case 1:
//             var old_content = document.getElementsByClassName("home_display");
//             for(let i = 0; i < old_content.length; i++){
//                 old_content[i].classList.remove("ease-in-right");
//                 old_content[i].classList.add("ease-out-left");
//                 setTimeout(function() {
//                     old_content[i].style.display = "none";
//                 }, 1500);
//             }

//             var old_nav = document.getElementById("home_nav");
//             old_nav.classList.remove("active");
            
//             var new_content_title = document.getElementsByClassName("contact_display_title");
//             var new_content_content = document.getElementsByClassName("contact_display_content");

//             setTimeout(function() {
//                 new_content_title[0].style.display = "block";
//                 new_content_title[0].classList.remove("ease-out-left");
//                 new_content_title[0].classList.add("ease-in-right");
//             }, 1500);
            
//             setTimeout(function() {
//                 new_content_content[0].style.display = "flex";
//                 new_content_content[0].classList.remove("ease-out-left");
//                 // new_content[i].classList.add("ease-in-right");
//                 new_content_content[0].classList.add("animation-target");
//                 var bounce = new Bounce();
//                 bounce
//                 .translate({
//                     from: { x: -300, y: 0 },
//                     to: { x: 0, y: 0 },
//                     duration: 1200,
//                     stiffness: 4
//                 })
//                 .scale({
//                     from: { x: 1, y: 1 },
//                     to: { x: 0.1, y: 2.3 },
//                     easing: "sway",
//                     duration: 800,
//                     delay: 200,
//                     stiffness: 2
//                 })
//                 .scale({
//                     from: { x: 1, y: 1},
//                     to: { x: 5, y: 1 },
//                     easing: "sway",
//                     duration: 500,
//                     delay: 30,
//                 })
//                 .applyTo(document.querySelectorAll(".animation-target"));
//             }, 3000);

//             var new_nav = document.getElementById("contact_nav");
//             new_nav.classList.add("active");

//             display_flag = 3;
//             break;
//         case 2:
//             var old_content = document.getElementsByClassName("project_display");
//             for(let i = 0; i < old_content.length; i++){
//                 old_content[i].classList.remove("ease-in-right");
//                 old_content[i].classList.add("ease-out-left");
//                 setTimeout(function() {
//                     old_content[i].style.display = "none";
//                 }, 1500);
//             }

//             var old_nav = document.getElementById("project_nav");
//             old_nav.classList.remove("active");
            
//             // old_content.classList.add("ease-out-left");
//             var new_content_title = document.getElementsByClassName("contact_display_title");
//             var new_content_content = document.getElementsByClassName("contact_display_content");

//             setTimeout(function() {
//                 new_content_title[0].style.display = "block";
//                 new_content_title[0].classList.remove("ease-out-left");
//                 new_content_title[0].classList.add("ease-in-right");
//             }, 1500);
            
//             setTimeout(function() {
//                 new_content_content[0].style.display = "flex";
//                 new_content_content[0].classList.remove("ease-out-left");
//                 // new_content[i].classList.add("ease-in-right");
//                 new_content_content[0].classList.add("animation-target");
//                 var bounce = new Bounce();
//                 bounce
//                 .translate({
//                     from: { x: -300, y: 0 },
//                     to: { x: 0, y: 0 },
//                     duration: 1200,
//                     stiffness: 4
//                 })
//                 .scale({
//                     from: { x: 1, y: 1 },
//                     to: { x: 0.1, y: 2.3 },
//                     easing: "sway",
//                     duration: 800,
//                     delay: 200,
//                     stiffness: 2
//                 })
//                 .scale({
//                     from: { x: 1, y: 1},
//                     to: { x: 5, y: 1 },
//                     easing: "sway",
//                     duration: 500,
//                     delay: 30,
//                 })
//                 .applyTo(document.querySelectorAll(".animation-target"));
//             }, 3000);

//             var new_nav = document.getElementById("contact_nav");
//             new_nav.classList.add("active");

//             display_flag = 3;
//             break;
//         default:
//             break;
//     }
// }
