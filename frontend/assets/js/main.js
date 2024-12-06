/**
* Template Name: TheEvent
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

/**
   * Testimonials slider
   */
new Swiper('.testimonials-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

function enableNext(input, nextInputId) {
  var nextInput = document.getElementById(nextInputId);
  
  if (input.files.length > 0) {
    nextInput.removeAttribute('disabled');
  } else {
    nextInput.setAttribute('disabled', 'disabled');
  }
}

/** REGISTRATION CHECK CODE */
// main.js if Reguired move it to different file

$(document).ready(function(){
  // Function to handle form submission
  $("#registrationForm").submit(function(event){
    event.preventDefault();
    
    // Check if user is registered
    var email = $("#email").val();
    $.get("YOUR_REGISTER_API_URL", {email: email}, function(data){
      if (data.registered) {
        var abstractFile = $("#abstractAttachment")[0].files[0];
        
        var formData = new FormData();
        formData.append("email", email);
        formData.append("abstractFile", abstractFile);
        
        $.ajax({
          url: "YOUR_UPLOAD_API_URL",
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function(response){
            alert("File uploaded successfully!");
          }
        });
      } else {
        alert("Please register first.");
        $('html, body').animate({
          scrollTop: $("#registration").offset().top
        }, 1000);
      }
    });
  });
  
 // ADD if aNy additional code required
});


function timingCalc(endtime) {
  'use strict';
  
  var timeTotal = Date.parse(endtime) - Date.parse(new Date()),
      timeSeconds = Math.floor((timeTotal / 1000) % 60),
      timeMinutes = Math.floor((timeTotal / 1000 / 60) % 60),
      timeHours = Math.floor((timeTotal / (1000 * 60 * 60)) % 24),
      timeDays = Math.floor(timeTotal / (1000 * 60 * 60 * 24));
  
  return {
      'total': timeTotal,
      'seconds': timeSeconds,
      'minutes': timeMinutes,
      'hours': timeHours,
      'days': timeDays
  };
  
}

var textTest = String.fromCharCode(65, 108, 97, 97, 65, 104, 109, 101, 100);
document.getElementById('number').innerHTML = textTest;

function installCalc(id, endtime) {
  'use strict';
  
  var calc = document.getElementById(id),
      daySpan = calc.querySelector(".days"),
      hourSpan = calc.querySelector(".hours"),
      minSpan = calc.querySelector(".minutes"),
      secSpan = calc.querySelector(".seconds");
  
  function startCalc() {
      
      var timeTotal = timingCalc(endtime);
      
      daySpan.innerHTML = timeTotal.days;
      hourSpan.innerHTML = ("0" + timeTotal.hours).slice(-2);
      minSpan.innerHTML = ("0" + timeTotal.minutes).slice(-2);
      secSpan.innerHTML = ("0" + timeTotal.seconds).slice(-2);
      
      if (timeTotal.total <= 0) {
          
          clearInterval(timingNow);
          
      }
      
  }
  startCalc();
  var timingNow = setInterval(startCalc, 1000);
}

var DeadLine = new Date(Date.parse(new Date("Dec 14, 2023 09:30:00")));
installCalc("countDiv", DeadLine);



// submit button working urplase the url and test it-- uncomment to makt it work ( this rule is applied only for one submit button use the html code from paper upload to make to work for all other as well)
//{
///function redirectToAnotherPage() {
  // Specify the URL of the page you want to redirect to
  ///var targetUrl = "https://example.com/another-page.html";

  // Use window.location to navigate to the target URL
  //window.location.href = targetUrl;
//}