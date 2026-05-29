
document.addEventListener("DOMContentLoaded", () => {

    

    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");
    const dotsContainer = document.getElementById("carouselDots");
    let currentSlide = 0;
    let carouselInterval;

    if (slides.length > 0) {

      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Ir a la diapositiva ${index + 1}`);
        dot.addEventListener("click", () => {
          goToSlide(index);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });

      const dots = document.querySelectorAll(".carousel-dot");


      const goToSlide = (n) => {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
      };


      const nextSlide = () => {
        goToSlide(currentSlide + 1);
      };

      const prevSlide = () => {
        goToSlide(currentSlide - 1);
      };


      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoplay();
      });

      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoplay();
      });



      const startAutoplay = () => {
        carouselInterval = setInterval(nextSlide, 4000);
      };

      const resetAutoplay = () => {
        clearInterval(carouselInterval);
        startAutoplay();
      };

      startAutoplay();
    }



    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navbarMenu = document.getElementById("navbarMenu");
    const dropdownItems = document.querySelectorAll(".menu-item.dropdown");
    const navLinks = document.querySelectorAll(".nav-link, .dropdown-menu a");



    mobileMenuBtn.addEventListener("click", () => {
      const isActive = navbarMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("open");
      


      if (!isActive) {
        dropdownItems.forEach(item => item.classList.remove("active-mobile-dropdown"));
      }
    });



    dropdownItems.forEach(item => {
      const link = item.querySelector(".nav-link");
      link.addEventListener("click", (e) => {
        // Solo interceptar clic si estamos en pantalla móvil
        if (window.innerWidth <= 768) {
          e.preventDefault();
          


          dropdownItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove("active-mobile-dropdown");
            }
          });



          item.classList.toggle("active-mobile-dropdown");
        }
      });
    });



    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        


        if (link.parentElement.classList.contains("dropdown") && window.innerWidth <= 768) {
          return;
        }
        


        navbarMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("open");
        dropdownItems.forEach(item => item.classList.remove("active-mobile-dropdown"));
      });
    });


    const footerYear = document.getElementById("footerYear");
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }

  });
