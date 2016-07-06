/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint plusplus: true */

/////////////////////////////////////////////////
/////          article layouts: overlay   ///////
/////////////////////////////////////////////////

//variable used to see if an overlay is currently visible
var overlayExist = false;


// function used to set an overlay based on the size. Important for creating the CSS of the overlay.
function getOverlay(verifySize) {
    "use strict";
    var $finalOverlay = "";
    if (verifySize) {
        $finalOverlay = $("<div class='overlaySpread removeMe'></div>");
        overlayExist = true;
        return $finalOverlay;
    } else {
        $finalOverlay = $("<div class='overlayTitlePage removeMe'></div>");
        overlayExist = true;
        return $finalOverlay;
    }
}

//function used to check if an overlay exists and, if it does it removes it before the next overlay appears.
function checkForOverlay(Exist) {
    "use strict";
    if (Exist) {
        $(".removeMe").remove();
        overlayExist = false;
    }
}

//activates when an image on the article layouts page is clicked
$(".overlayImage a").click(function (event) {
    "use strict";
    event.preventDefault();                  //prevents clicking image from opening new window
    var getImage,
        captionText,
        specificImage,
        $overlay,
        $image = $("<img>"),
        $caption = $("<p></p>"),
        $button = $("<button class='closeIt'>X</button>"),
        isImgSpread = false;
    specificImage = $(this.getElementsByTagName("img"));      //get the specific image tag for the item clicked on.
    if (parseInt($(specificImage).attr("width"), 10) === 150) {   //check the width attribute to verify size of document.
        isImgSpread = true;
    } else {
        isImgSpread = false;
    }
    checkForOverlay(overlayExist);
    $overlay = getOverlay(isImgSpread);                   //call function to create the div tag
    $overlay.append($image);                             //append the image tag to the overlay
    $overlay.append($caption);                            //append the p tag to overlay
    $overlay.append($button);
    $("body").append($overlay);                          //append the overlay to the body
    getImage = $(this).attr("href");                     //sets a variable to the href of whatever image is clicked on
    $image.attr("src", getImage);                        //assigns the src of the image tag created above to the href

    captionText = $(this).children("img").attr("alt");  //sets a variable to the alternate text to be used as caption
    $caption.text(captionText);                          //assigns the alt text to the caption tag created above.
    $overlay.show();                                    //shows the overlay itself

});

//sets up the close button to activate; for article layouts page
$("body").on('click', '.closeIt', function (event) {
    "use strict";
    overlayExist = false;
    $(".removeMe").remove();
});

/////////////////////////////////////////////////
///// article layouts: arrows for carousel///////
/////////////////////////////////////////////////


var $arrow = $("<div id='arrow'></div>"),
    $arrowLeftImg = $("<img src='img/simplearrow-left.png' alt='left arrow' id='leftArrow'>"),
    $arrowRightImg = $("<img src='img/simplearrow-right.png' alt='left arrow' id='rightArrow'>");


//$arrow.append($arrowLeftImg);
//$arrow.append($arrowRightImg);
//$("#forArrows").append($arrow);

function putArrowsOnSlider() {
    "use strict";
    if (document.getElementById("forArrows")) {
        $arrow.append($arrowLeftImg);
        $arrow.append($arrowRightImg);
        $("#forArrows").append($arrow);
    }
}


putArrowsOnSlider();


/////////////////////////////////////////////////
/////           Slick Carousel            ///////
/////////////////////////////////////////////////

$(".carousel").slick({
    autoplay: true,
    autoplaySpeed: 3500,
    dots: true,
    prevArrow: $("#leftArrow"),
    nextArrow: $("#rightArrow")
});


/////////////////////////////////////////////////
/////   Misc Work Main Page: CSS Change   ///////
/////////////////////////////////////////////////

//make every even image move to the left by 50%

var myImages = document.querySelectorAll(".miscImage"),
    i;
    

function positionImages() {
    "use strict";
    for (i = 0; i < myImages.length; i++) {
        if (((i + 1) % 2 === 0) && ($(window).width() <= 549)) {
            myImages[i].style.left = (50 + "%");
        } else {
            myImages[i].style.left = (0);
        }
    }
}

function positionHeaders() {
    "use strict";
    if (document.getElementById("miscWork")) {
        var myHeaders = document.querySelectorAll("header"), i;
        for (i = 1; i < myHeaders.length; i++) {
            if (((i) % 2 === 0) && ($(window).width() <= 549)) {
                myHeaders[i].style.left = (3 + "%");
                myHeaders[i].style.width = (45 + "%");
            } else {
                myHeaders[i].style.left = (45 + "%");
                myHeaders[i].style.width = (55 + "%");
            }
        }
    }
}

$(window).resize(function () {
    "use strict";
    positionImages();
    positionHeaders();
});

positionImages();
positionHeaders();

/////////////////////////////////////////////////
/////  Misc Work: Move MiscTitleStuff      ///////
/////////////////////////////////////////////////

//This gets the text to appear properly when the image is hovered on. For Main Miscellaneous Page Takes care of headers both within circles and when smaller window sized.

var titleList = document.querySelectorAll(".miscTitleStuff"),
    boxList = document.querySelectorAll(".miscBox"),
    originalList = document.querySelectorAll("#miscWork article a header"),
    titleCounter;

function moveTitle() {
    "use strict";
    for (titleCounter = 0; titleCounter < titleList.length; titleCounter++) {
        if ($(window).width() > 550) {
            $(boxList[titleCounter]).append(titleList[titleCounter]);
        } else {
            $(originalList[titleCounter]).append(titleList[titleCounter]);
        }
    }
}

$(window).resize(function () {
    "use strict";
    moveTitle();
});

moveTitle();

/////////////////////////////////////////////////
/////  Misc Work: Placing Correct Image   ///////
/////////////////////////////////////////////////

//Makes sure correct material gets shown

var miscImageHolder = document.querySelectorAll("#marbleCircle img"),
    list,
    item;

function placeCenterMaterial() {
    "use strict";
    var n,
        revealedImage = $('section[class="reveal"] div[class="justImage"]'),
        revealedText = $('section[class="reveal"] div[class="textForCircle"]'),
        sectionList = $(miscImageHolder).parent().parent(),
        removeImage,
        removeText;
    if (($('#fullCircleStuff div[class="justImage"]').length) >= 1) {
        removeImage = $('#fullCircleStuff div[class="justImage"]')[0];
        removeText =  $('#fullCircleStuff div[class="textForCircle"]')[0];
        $(removeImage).remove();
        $(removeText).remove();
        for (n = 0; n < sectionList.length; n++) {
            if ($(sectionList[n]).children("div").children().attr("alt") === $(removeImage).children().attr("alt")) {
                $(sectionList[n]).append(removeImage);
                $(sectionList[n]).children("header").append(removeText);
            }
        }
    }
    $("#fullCircleStuff").append(revealedImage).append(revealedText);
}



//This gets the correct image and reveals it when clicked on
function getClickedImage() {
    "use strict";
    var mIC; //short for miscImageCounter
    if (document.getElementById("marbleCircle")) {
        list = document.getElementById("marbleCircle");
        item = $(list.lastChild);
        
        if ($(item).is('img')) {
            $(list.lastChild).remove();
        }
        for (mIC = 0; mIC < miscImageHolder.length; mIC++) {
            if ($(miscImageHolder[mIC]).attr("alt") === $(item).attr("alt")) {
                $(miscImageHolder[mIC]).parent().parent().addClass("reveal");
            } else {
                $(miscImageHolder[mIC]).parent().parent().addClass("hide");
            }
        }
        placeCenterMaterial();
    }
}

$(window).load(function () {
    "use strict";
    getClickedImage();
});


//$(window).resize(function () {
//    "use strict";
//    getClickedImage();
//});

if (document.getElementById("miscWork")) {
    $(".miscTitleStuff").click(function (event) {
        "use strict";
        event.preventDefault();
    });
}

/////////////////////////////////////////////////
/////      Misc Work: Prev/Next Buttons   ///////
/////////////////////////////////////////////////

var imageLocation = document.querySelectorAll("#marbleCircle section"),
    locCntr;



function getNext() {
    "use strict";
    for (locCntr = 0; locCntr < imageLocation.length; locCntr++) {
        if ($(imageLocation[locCntr]).hasClass("reveal")) {
            $(imageLocation[locCntr]).removeClass("reveal").addClass("hide");
            if (imageLocation[locCntr] === imageLocation[(imageLocation.length) - 1]) {
                $(imageLocation[0]).removeClass("hide").addClass("reveal");
                placeCenterMaterial();
                break;
            } else {
                $(imageLocation[locCntr]).next().removeClass("hide").addClass("reveal");
                placeCenterMaterial();
                break;
            }
        }
    }
}

function getPrevious() {
    "use strict";
    for (locCntr = 0; locCntr < imageLocation.length; locCntr++) {
        if ($(imageLocation[locCntr]).hasClass("reveal")) {
            $(imageLocation[locCntr]).removeClass("reveal").addClass("hide");
            if (imageLocation[locCntr] === imageLocation[0]) {
                $(imageLocation[(imageLocation.length) - 1]).removeClass("hide").addClass("reveal");
                placeCenterMaterial();
                break;
            } else {
                $(imageLocation[locCntr]).prev().removeClass("hide").addClass("reveal");
                placeCenterMaterial();
                break;
            }
        }
    }
}


if (document.getElementById("marbleCircle")) {
    document.getElementById("nextImage").addEventListener("click", getNext);
    document.getElementById("prevImage").addEventListener("click", getPrevious);
}


/////////////////////////////////////////////////
/////    Misc Work: create image circle   ///////
/////////////////////////////////////////////////


function makeCircle() {
    "use strict";
    var radius = 380,
        fields = $('.smallSquares'),
        container = $('#fullCircleStuff'),
        width = container.width(),
        height = container.height(),
        angle = 180,
        step = (2 * Math.PI) / fields.length;
    fields.each(function () {
        var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2),
            y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
//        used to log out the x, y coordinates to the console for testing.
//        if (window.console) {
//            console.log($(this).text(), x, y);
//        }
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}

//I used this to call the function as calling it alone moved the circle of circles off to the side and didn't center them. I used the window resize so that it would resize properly when going from small to large and, when going from the window Miscellaneous Work into the window showing the actual Image alone. This caused a problem.

$(window).resize(function () {
    "use strict";
    makeCircle();
});

makeCircle();


///////////////////////////////////////////////////////
/////Misc Work: Clicked Image Within Full Circle///////
///////////////////////////////////////////////////////

$(".smallSquares img").click(function (evt) {
    "use strict";
    var i,
        newImage,
        newText,
        oldImage,
        oldText,
        checkClass,
        forAddingClass,
        altText = $(this).attr("alt"),
        compareText = $('div[class="marbleImage"] img'),
        listOfSections = $(compareText).parent().parent();
    
    for (i = 0; i < compareText.length; i++) {
        checkClass = $(compareText).parent().parent()[i];
        if ($(checkClass).hasClass("reveal")) {
            $(checkClass).removeClass("reveal").addClass("hide");
        } //end if
        if (altText === $(compareText[i]).attr("alt")) {
//            forAddingClass = $(compareText).parent().parent()[i];
            $(checkClass).removeClass("hide").addClass("reveal");
            if ($("#marbleCircle").children(".reveal").children().hasClass("justImage")) {
                newImage = $("#marbleCircle").children(".reveal").children(".justImage");
                newText = $("#marbleCircle").children(".reveal").children("header").children(".textForCircle");
            } else {
                newImage = $("#fullCircleStuff").children(".justImage");
                newText = $("#fullCircleStuff").children(".textForCircle");
            } //end if
            oldImage = $("#fullCircleStuff").children(".justImage");
            oldText = $("#fullCircleStuff").children(".textForCircle");
            $("#fullCircleStuff").children(".textForCircle").remove();
            $("#fullCircleStuff").children(".justImage").remove();
            $("#fullCircleStuff").append(newImage).append(newText);
        } //end if
    } //end for

    for (i = 0; i < listOfSections.length; i++) {
        if ($(oldImage).children().attr("alt") !== $(newImage).children().attr("alt")) {
            if ($(listOfSections[i]).children("div").children().attr("alt") === $(oldImage).children().attr("alt")) {
                $(listOfSections[i]).append(oldImage);
                $(listOfSections[i]).children("header").append(oldText);
            } //end if
        } //end if
    } //end for
    
});


////////////////////////////////////////////////////////
/////Contact Page: Verify Information Before Submit/////
///////////////////////////////////////////////////////


var $name = $("#name"),
    $email = $("#email"),
    $emailAgain = $("#emailAgain"),
    $phone = $("#phone"),
    $verify = $("#mathProblem");

$(".contactHint").hide();

function emptyCheck(check) {
    "use strict";
    var isEmpty = $(check).val();
    if (isEmpty === "") {
        $(check).next().hide();
    }
}

function isNameValid() {
    "use strict";
    return $name.val().length >= 2;
}

function nameEvent() {
    "use strict";
    if (isNameValid()) {
        $name.next().hide();
    } else {
        $name.next().show();
    }
    emptyCheck($name);
}

function isEmailValid() {
    "use strict";
    var checkEmail = new RegExp("^\\S+@\\S+[\\.][0-9a-z]+$"),
        email = $email.val();
    return checkEmail.test(email.toLowerCase());
}

function emailEvent() {
    "use strict";
    if (isEmailValid()) {
        $email.next().hide();
    } else {
        $email.next().show();
    }
    emptyCheck($email);
}

function isEmailAgainValid() {
    "use strict";
    var checkEmail = new RegExp("^\\S+@\\S+[\\.][0-9a-z]+$"),
        email = $emailAgain.val();
    return checkEmail.test(email.toLowerCase());
}

function emailEventAgain() {
    "use strict";
    if (isEmailAgainValid()) {
        $emailAgain.next().hide();
    } else {
        $emailAgain.next().show();
    }
    emptyCheck($emailAgain);
}

function checkEmails() {
    "use strict";
    var i,
        email,
        emailAgain,
        emailsSame = false,
        $noMatch = $("<span>emails do not match</span>");
    if (($email.val() !== "") && ($emailAgain.val() !== "")) {
        email = $email.val().toLowerCase();
        emailAgain = $emailAgain.val().toLowerCase();
        if (email !== emailAgain) {
            emailsSame = false;
            $("#warning").append($noMatch).show();
//            for (i = 1; i < ($("#warning").children("span")).length; i++) {
//                $("#warning").children().remove("span");
//            }
        } else {
            $("#warning").hide();
            emailsSame = true;
            return (emailsSame);
        }
    } else if (($email.val() === "") && ($emailAgain.val() === "")) {
        $("#warning").hide();
    }
    for (i = 1; i < ($("#warning").children("span")).length; i++) {
        $("#warning").children().remove("span");
    }
}
                                
function isPhoneValid() {
    "use strict";
    var checkAgainst = new RegExp("^(\\(?\\d\\d\\d\\)?)( |-|\\.)?\\d\\d\\d( |-|\\.)?\\d{4,4}(( |-|\\.)?[ext\\.]+ ?\\d+)?$"),
    //    ("^\\(*\\+*[1-9]{0,3}\\)*-*[1-9]{0,3}[-. /]*\\(*[2-9]\\d{2}\\)*[-. /]*\\d{3}[-. /]*\\d{4} *e*x*t*\\.* *\\d{0,4}$"),
        phone = $phone.val();
    return checkAgainst.test(phone);
}

function phoneEvent() {
    "use strict";
    if (isPhoneValid()) {
        $phone.next().hide();
    } else {
        $phone.next().show();
    }
    emptyCheck($phone);
}

function isVerifyValid() {
    "use strict";
    var correctAnswer = 3;
    return correctAnswer === parseInt(($verify).val(), 10);
}

function verifyEvent() {
    "use strict";
    if (isVerifyValid()) {
        $verify.next().hide();
    } else {
        $verify.next().show();
    }
    emptyCheck($verify);
}

function checkToSubmit() {
    "use strict";
    return isNameValid() && checkEmails() && isVerifyValid();
}

function enableSubmitButton() {
    "use strict";
    $("#submit").prop("disabled", !checkToSubmit());
}

if (document.getElementById("contactWrapper")) {
    enableSubmitButton();
}

$name.focus(nameEvent).keyup(nameEvent).keyup(enableSubmitButton);
$email.focus(emailEvent).keyup(emailEvent).focus(checkEmails).change(checkEmails).keyup(enableSubmitButton);
$emailAgain.focus(emailEventAgain).keyup(emailEventAgain).focus(checkEmails).change(checkEmails).keyup(enableSubmitButton);
$verify.keyup(verifyEvent).change(verifyEvent).keyup(enableSubmitButton);
$phone.focus(phoneEvent).keyup(phoneEvent);
