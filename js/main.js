var display_flag = 1;
var in_GE = false;
var TARGY_CHAT_API_URL = "https://websitebackend-sdoh.onrender.com/chat";
            
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    showProjectList(false);

    var projectSections = document.querySelectorAll(".nonGE > .project-container");
    
    for (var i = 0; i < projectSections.length; i++) {
        var categories = (projectSections[i].getAttribute("data-categories") || "").split(",");
        categories = categories.map(function (categoryName) {
            return categoryName.trim();
        });

        if (category === "all" || categories.includes(category)) {
            projectSections[i].style.display = "flex";
            projectSections[i].classList.add("current_display_category");
        } else {
            projectSections[i].style.display = "none";
            projectSections[i].classList.add("current_display_category");
        }
    }

    applyProjectLayout();
}

function applyProjectLayout() {
    var visibleProjects = Array.from(document.querySelectorAll(".nonGE > .project-container")).filter(function (projectSection) {
        return projectSection.style.display !== "none";
    });

    visibleProjects.forEach(function (projectSection, index) {
        projectSection.classList.remove("project-layout-text-left");
        projectSection.classList.remove("project-layout-text-right");

        if (index % 2 === 0) {
            projectSection.classList.add("project-layout-text-left");
        } else {
            projectSection.classList.add("project-layout-text-right");
        }
    });
}

function showGameEnginePage() {
    var projectList = document.getElementsByClassName("nonGE")[0];
    var gameEnginePage = document.getElementsByClassName("GEContent")[0];

    if (!projectList || !gameEnginePage) {
        return;
    }

    projectList.style.display = "none";
    gameEnginePage.classList.add("project-engine-page-active");
    in_GE = true;

    gameEnginePage.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function showProjectList(shouldScroll) {
    var projectList = document.getElementsByClassName("nonGE")[0];
    var gameEnginePage = document.getElementsByClassName("GEContent")[0];

    if (!projectList || !gameEnginePage) {
        return;
    }

    projectList.style.display = "block";
    gameEnginePage.classList.remove("project-engine-page-active");
    gameEnginePage.style.display = "none";
    in_GE = false;
    applyProjectLayout();

    if (shouldScroll !== false) {
        projectList.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
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

    targetContent[0].classList.remove("fade-out");

    setTimeout(function () {
        currentDisplay[0].style.display = "none";
        
         targetContent[0].style.display = "block";
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

function initAI2USwipeCards() {
    var cardArea = document.querySelector(".ai2u-card-area");
    if (!cardArea) {
        return;
    }

    var cards = Array.from(cardArea.getElementsByClassName("ai2u-card"));
    if (cards.length === 0) {
        return;
    }

    var activeIndex = 1;
    var startX = 0;
    var currentX = 0;
    var isDragging = false;
    var draggedEnough = false;
    var downCardIndex = 0;
    var downWasActive = true;
    var suppressClick = false;
    var positions = {
        desktop: [
            { x: -820, y: 0, scale: 0.48, rotate: 0, z: 1 },
            { x: -610, y: 0, scale: 0.58, rotate: 0, z: 2 },
            { x: -420, y: 0, scale: 0.68, rotate: 0, z: 3 },
            { x: 420, y: 0, scale: 0.68, rotate: 0, z: 3 },
            { x: 610, y: 0, scale: 0.58, rotate: 0, z: 2 },
            { x: 820, y: 0, scale: 0.48, rotate: 0, z: 1 }
        ],
        medium: [
            { x: -560, y: 0, scale: 0.45, rotate: 0, z: 1 },
            { x: -420, y: 0, scale: 0.52, rotate: 0, z: 2 },
            { x: -295, y: 0, scale: 0.6, rotate: 0, z: 3 },
            { x: 295, y: 0, scale: 0.6, rotate: 0, z: 3 },
            { x: 420, y: 0, scale: 0.52, rotate: 0, z: 2 },
            { x: 560, y: 0, scale: 0.45, rotate: 0, z: 1 }
        ],
        narrow: [
            { x: -330, y: 0, scale: 0.38, rotate: 0, z: 1 },
            { x: -255, y: 0, scale: 0.44, rotate: 0, z: 2 },
            { x: -180, y: 0, scale: 0.52, rotate: 0, z: 3 },
            { x: 180, y: 0, scale: 0.52, rotate: 0, z: 3 },
            { x: 255, y: 0, scale: 0.44, rotate: 0, z: 2 },
            { x: 330, y: 0, scale: 0.38, rotate: 0, z: 1 }
        ]
    };

    function getSidePosition(offset) {
        var narrowScreen = window.innerWidth <= 576;
        var mediumScreen = window.innerWidth <= 900;
        var basePositions = positions.desktop;

        if (narrowScreen) {
            basePositions = positions.narrow;
        } else if (mediumScreen) {
            basePositions = positions.medium;
        }

        return offset < 0 ? basePositions[3 + offset] : basePositions[2 + offset];
    }

    function updateCards() {
        cards.forEach(function (card, index) {
            card.classList.remove("ai2u-card-focus");
            card.style.removeProperty("--drag-x");
            card.style.removeProperty("--drag-rotate");

            if (!card.dataset.target) {
                card.dataset.target = card.getAttribute("href");
            }

            if (index === activeIndex) {
                card.classList.add("ai2u-card-focus");
                card.setAttribute("href", card.dataset.target);
                card.setAttribute("aria-disabled", "false");
                card.style.setProperty("--x", "0px");
                card.style.setProperty("--y", "0px");
                card.style.setProperty("--scale", "1");
                card.style.setProperty("--rotate", "0deg");
                card.style.setProperty("--z", "5");
            } else {
                var position = getSidePosition(index - activeIndex);
                card.removeAttribute("href");
                card.setAttribute("aria-disabled", "true");
                card.style.setProperty("--x", position.x + "px");
                card.style.setProperty("--y", position.y + "px");
                card.style.setProperty("--scale", position.scale);
                card.style.setProperty("--rotate", position.rotate + "deg");
                card.style.setProperty("--z", position.z);
            }
        });
    }

    function focusCard(index) {
        activeIndex = Math.max(0, Math.min(cards.length - 1, index));
        updateCards();
    }

    function focusNextCard(direction) {
        focusCard(activeIndex + direction);
    }

    function scrollToCardTarget(card) {
        var targetSelector = card.dataset.target || card.getAttribute("href");
        var target = targetSelector ? document.querySelector(targetSelector) : null;
        if (!target) {
            return;
        }

        var nav = document.querySelector(".nav");
        var navOffset = nav ? Math.ceil(nav.getBoundingClientRect().bottom) : 56;
        var scrollElement = document.scrollingElement || document.documentElement;
        var currentScroll = scrollElement.scrollTop || window.pageYOffset || 0;
        var targetTop = target.getBoundingClientRect().top + currentScroll - navOffset;

        if (history.pushState) {
            history.pushState(null, "", targetSelector);
        }

        if (scrollElement.scrollTo) {
            scrollElement.scrollTo({
                top: targetTop,
                behavior: "smooth"
            });
        } else {
            scrollElement.scrollTop = targetTop;
        }
    }

    cards.forEach(function (card, index) {
        card.addEventListener("pointerdown", function (event) {
            startX = event.clientX;
            currentX = startX;
            downCardIndex = index;
            downWasActive = index === activeIndex;
            isDragging = true;
            draggedEnough = false;
            card.setPointerCapture(event.pointerId);
        });

        card.addEventListener("pointermove", function (event) {
            if (!isDragging) {
                return;
            }

            currentX = event.clientX;
            var deltaX = currentX - startX;

            if (Math.abs(deltaX) > 8) {
                draggedEnough = true;
                var activeCard = cards[activeIndex];
                activeCard.style.setProperty("--drag-x", (deltaX * 0.35) + "px");
                activeCard.style.setProperty("--drag-rotate", (deltaX / 40) + "deg");
            }
        });

        card.addEventListener("pointerup", function () {
            if (!isDragging) {
                return;
            }

            var deltaX = currentX - startX;
            isDragging = false;

            if (draggedEnough) {
                suppressClick = true;

                if (Math.abs(deltaX) > 70) {
                    focusNextCard(deltaX < 0 ? 1 : -1);
                } else {
                    updateCards();
                }

                setTimeout(function () {
                    suppressClick = false;
                }, 0);
            } else if (!downWasActive) {
                suppressClick = true;
                focusCard(downCardIndex);

                setTimeout(function () {
                    suppressClick = false;
                }, 0);
            }
        });

        card.addEventListener("pointercancel", function () {
            isDragging = false;
            updateCards();
        });

        card.addEventListener("click", function (event) {
            if (suppressClick || !downWasActive || index !== activeIndex) {
                event.preventDefault();

                if (!suppressClick && index !== activeIndex) {
                    focusCard(index);
                }
            } else {
                event.preventDefault();
                scrollToCardTarget(card);
            }
        });
    });

    window.addEventListener("resize", updateCards);
    updateCards();
}

function initAI2UGalleryFit() {
    var gallery = document.querySelector(".ai2u-gallery");
    if (!gallery) {
        return;
    }

    var carouselInner = gallery.querySelector(".carousel-inner");
    if (!carouselInner) {
        return;
    }

    function getImageHeight(slide) {
        var image = slide ? slide.querySelector("img") : null;
        if (!image) {
            return 0;
        }

        var galleryWidth = gallery.getBoundingClientRect().width;
        if (image.naturalWidth && image.naturalHeight) {
            return galleryWidth * image.naturalHeight / image.naturalWidth;
        }

        return image.getBoundingClientRect().height;
    }

    function fitToSlide(slide) {
        var imageHeight = getImageHeight(slide);
        if (imageHeight > 0) {
            carouselInner.style.height = imageHeight + "px";
        }
    }

    function fitToActiveSlide() {
        fitToSlide(gallery.querySelector(".carousel-item.active"));
    }

    gallery.addEventListener("slide.bs.carousel", function (event) {
        fitToSlide(event.relatedTarget);
    });

    gallery.addEventListener("slid.bs.carousel", fitToActiveSlide);
    window.addEventListener("resize", fitToActiveSlide);

    var galleryImages = gallery.getElementsByTagName("img");
    for (var i = 0; i < galleryImages.length; i++) {
        galleryImages[i].addEventListener("load", fitToActiveSlide);
    }

    fitToActiveSlide();
}

function initAI2UPage() {
    initAI2USwipeCards();
    initAI2UGalleryFit();
    initTargyChatbox();
    applyProjectLayout();
}

function initTargyChatbox() {
    var chatWidget = document.getElementById("targy_chat_widget");
    var chatButton = document.getElementById("targy_chat_button");
    var closeButton = document.getElementById("targy_chatbox_close");
    var chatbox = document.getElementById("targy_chatbox");
    var chatForm = document.querySelector(".targy-chatbox-form");
    var chatInput = chatForm ? chatForm.querySelector("input") : null;
    var chatSubmitButton = chatForm ? chatForm.querySelector("button") : null;
    var chatMessages = document.querySelector(".targy-chatbox-messages");
    var chatHistory = [];

    if (!chatWidget || !chatButton || !closeButton || !chatbox || !chatForm || !chatInput || !chatMessages) {
        return;
    }

    function setChatOpen(isOpen) {
        chatWidget.classList.toggle("targy-chat-open", isOpen);
        chatButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        chatbox.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }

    chatButton.addEventListener("click", function () {
        setChatOpen(!chatWidget.classList.contains("targy-chat-open"));
    });

    closeButton.addEventListener("click", function () {
        setChatOpen(false);
    });

    function appendChatMessage(message, role) {
        var messageElement = document.createElement("div");
        messageElement.className = "targy-chat-message targy-chat-message-" + role;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageElement;
    }

    function setChatLoading(isLoading) {
        chatInput.disabled = isLoading;
        if (chatSubmitButton) {
            chatSubmitButton.disabled = isLoading;
        }
    }

    async function sendChatMessage(message) {
        setChatLoading(true);
        var loadingMessage = appendChatMessage("Thinking...", "agent targy-chat-message-loading");

        try {
            var response = await fetch(TARGY_CHAT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    history: chatHistory
                })
            });

            var data = await response.json();
            loadingMessage.remove();

            if (!response.ok) {
                appendChatMessage(data.error || "The AI service is unavailable right now.", "error");
                return;
            }

            var answer = data.answer || "I do not know yet.";
            appendChatMessage(answer, "agent");
            chatHistory.push({ role: "user", content: message });
            chatHistory.push({ role: "assistant", content: answer });
            chatHistory = chatHistory.slice(-6);
        } catch (error) {
            loadingMessage.remove();
            appendChatMessage("I could not reach the AI service right now.", "error");
        } finally {
            setChatLoading(false);
            chatInput.focus();
        }
    }

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var message = chatInput.value.trim();
        if (!message) {
            return;
        }

        appendChatMessage(message, "user");
        chatInput.value = "";
        sendChatMessage(message);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAI2UPage);
} else {
    initAI2UPage();
}

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
