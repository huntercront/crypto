WebFontConfig = {
   google: { families: ["Inter:300,400&display=swap"] },
};

(function (d) {
   var wf = d.createElement("script"),
      s = d.scripts[0];
   wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
   wf.async = true;
   s.parentNode.insertBefore(wf, s);
})(document);

//loader function
var Loader = function () {};
Loader.prototype = {
   require: function (scripts, callback) {
      this.loadCount = 0;
      this.totalRequired = scripts.length;
      this.callback = callback;
      for (var i = 0; i < scripts.length; i++) {
         this.writeScript(scripts[i]);
      }
   },
   loaded: function (evt) {
      this.loadCount++;
      if (
         this.loadCount == this.totalRequired &&
         typeof this.callback == "function"
      )
         this.callback.call();
   },
   writeScript: function (src) {
      var self = this;
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.defer = true;
      s.src = src;
      s.addEventListener(
         "load",
         function (e) {
            self.loaded(e);
         },
         false
      );
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(s);
   },
};

var l = new Loader();
l.require(["../js/lazy.js"], function () {
   lazy = new LazyLoad({
      elements_selector: ".lazy",
      callback_loaded: callback_loaded,
      unobserve_entered: true,
   });
});

var lazy;
var callback_loaded = function (element) {
   if (element.closest(".lazy-img")) {
      element.closest(".lazy-img").classList.remove("lazy-progress");
   }
};
document.addEventListener("DOMContentLoaded", function (event) {
   document.body.classList.remove("loading");
   // slidetoggle
   let slideUp = (e, t = 500, s, d) => {
         (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.boxSizing = "border-box"),
            (e.style.height = e.offsetHeight + "px"),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = 0),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            s.classList.remove(d),
            window.setTimeout(() => {
               (e.style.display = "none"),
                  e.style.removeProperty("height"),
                  e.style.removeProperty("padding-top"),
                  e.style.removeProperty("padding-bottom"),
                  e.style.removeProperty("margin-top"),
                  e.style.removeProperty("margin-bottom"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property");
            }, t);
      },
      slideDown = (e, t = 500, s, d) => {
         e.style.removeProperty("display");
         let o = window.getComputedStyle(e).display;
         "none" === o && (o = "block"), (e.style.display = o);
         let r = e.offsetHeight;
         (e.style.overflow = "hidden"),
            (e.style.height = 0),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.boxSizing = "border-box"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = r + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            s.classList.add(d),
            window.setTimeout(() => {
               e.style.removeProperty("height"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property");
            }, t);
      };
   var slideToggle = (e, t = 500, s, d) =>
      "none" === window.getComputedStyle(e).display
         ? slideDown(e, t, s, d)
         : slideUp(e, t, s, d);

   // faq
   let accordeons = document.querySelectorAll(".faq-question");
   if (accordeons.length > 0) {
      accordeons.forEach(function (accordeon) {
         let accordeonTitle = accordeon.querySelector(".question-name");
         let accordeonContent = accordeon.querySelector(".faq-answer");
         accordeonTitle.addEventListener("click", function (e) {
            e.preventDefault();
            if (accordeon.open == true) {
               slideUp(accordeonContent, 250, accordeon, "open");
               setTimeout(() => {
                  accordeon.open = false;
               }, 250);
            } else {
               accordeon.open = true;
               slideDown(accordeonContent, 250, accordeon, "open");
            }
         });
      });
   }

   //anchor scroll
   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      let headerOfsett = document.querySelector(".header").offsetHeight * 1.5;
      anchor.addEventListener("click", function (e) {
         e.preventDefault();
         if (document.querySelector(this.getAttribute("href"))) {
            let currentEl = document.querySelector(this.getAttribute("href"));
            let position = currentEl.getBoundingClientRect().top;
            let scrollToPos = position + window.pageYOffset - headerOfsett;
            setTimeout(() => {
               window.scrollTo({
                  top: scrollToPos,
                  behavior: "smooth",
               });
            }, 25);
         }
      });
   });

   // nav-hover
   document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
         const hoverBg = document.querySelector(".hover-bg");
         const linkRect = e.target.getBoundingClientRect();
         const navbarRect = document
            .querySelector(".nav")
            .getBoundingClientRect();
         hoverBg.style.width = `${linkRect.width}px`;
         hoverBg.style.left = `${linkRect.left - navbarRect.left}px`;
         hoverBg.style.opacity = "1";
      });
      document.querySelector(".nav").addEventListener("mouseleave", () => {
         const hoverBg = document.querySelector(".hover-bg");
         hoverBg.style.opacity = "0";
      });
   });

   // scrollanim
   const aminItems = document.querySelectorAll(".animate");

   function animOnScroll() {
      aminItems.forEach(function (aminItem) {
         let animItemHeight = aminItem.offsetHeight;
         let animItemOffset = offset(aminItem).top;
         let animStart = 10;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight >= window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }
         if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
         ) {
            if (aminItem.classList.contains("stats")) {
            } else {
               if (aminItem.getAttribute("data-delay")) {
                  aminItem.style.transitionDelay =
                     aminItem.getAttribute("data-delay") + "ms";
               }
               aminItem.classList.add("animate-active");
            }
         }
      });
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
         top: rect.top + scrollTop,
         left: rect.left + scrollLeft,
      };
   }
   function doSomething(scroll_pos) {
      animOnScroll();
   }
   setTimeout(() => {
      animOnScroll();
   }, 5);

   let last_known_scroll_position = 0;
   let ticking = false;
   window.addEventListener("scroll", function (e) {
      last_known_scroll_position = window.scrollY;

      if (!ticking) {
         window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
         });

         ticking = true;
      }
   });

   // lang-toggle
   let langBtn = document.querySelector(".lang-btn");
   let langMenu = document.querySelector(".lang-menu");
   let langName = document.querySelector(".lang-name");
   langBtn.addEventListener("click", function (e) {
      langMenu.classList.toggle("active");
   });

   function updateLangSelctor(el) {
      langName.textContent = el.textContent;
      langMenu.classList.remove("active");
   }
   document.addEventListener("click", (e) => {
      if (
         langBtn &&
         !e.target.closest(".lang-selector") &&
         langMenu.classList.contains("active")
      ) {
         langMenu.classList.remove("active");
      }
   });

   let currentTranslations = {};

   async function loadTranslations(lang) {
      try {
         const response = await fetch(`../lang/${lang}.json`);
         return await response.json();
      } catch (error) {
         console.error("Ошибка загрузки переводов:", error);
         return {};
      }
   }

   async function applyTranslations(translations) {
      const elements = document.querySelectorAll("[data-i18n]");
      elements.forEach((el) => el.classList.add("fade-out"));
      await new Promise((resolve) => setTimeout(resolve, 250));
      elements.forEach((element) => {
         const key = element.getAttribute("data-i18n");
         const value = key
            .split(".")
            .reduce((obj, k) => obj?.[k], translations);
         if (value) {
            if (element.getAttribute("data-type")) {
               element.setAttribute("data-type", value);
               intitPrint(element);
            } else {
               element.textContent = value;
            }
         }
         element.classList.remove("fade-out");
      });
   }
   async function initLanguage() {
      const savedLang =
         localStorage.getItem("lang") || navigator.language.slice(0, 2);
      if (savedLang != "ru") {
         currentTranslations = await loadTranslations(savedLang);
         applyTranslations(currentTranslations);
      }
   }
   document.querySelectorAll(".lang-item").forEach((button) => {
      button.addEventListener("click", async () => {
         const lang = button.getAttribute("data-lang");
         localStorage.setItem("lang", lang);
         updateLangSelctor(button);
         currentTranslations = await loadTranslations(lang);
         document.documentElement.lang = lang;
         applyTranslations(currentTranslations);
      });
   });
   initLanguage();
});
