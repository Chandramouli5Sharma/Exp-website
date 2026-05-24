/**
 * Main JavaScript file for the Robotics Club Nitte Website
 * --------------------------------------------------------
 * This script handles all the interactive functionality on the site, including:
 * 1. Toggling the mobile navigation menu.
 * 2. Applying fade-in animations to sections as they are scrolled into view.
 * 3. Submitting the contact form data to a Google Form endpoint.
 * 4. Handling the office bearer scroller animation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // 1. Mobile Menu Toggle
  // ===================================================================
  // This logic controls the hamburger menu on smaller screens.
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      // The 'toggle' method adds the 'hidden' class if it's not present,
      // and removes it if it is. This is a simple way to show/hide the menu.
      mobileMenu.classList.toggle('hidden');
    });
  }


  // ===================================================================
  // 2. Scroll Animation Logic
  // ===================================================================
  // This part of the script makes sections fade in as the user scrolls.
  const sections = document.querySelectorAll('.fade-in-section');

  if (sections.length > 0) {
    // The Intersection Observer API is a modern, efficient way to detect
    // when an element enters the viewport.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 'isIntersecting' is true when the element is visible.
        if (entry.isIntersecting) {
          // We add a CSS class 'is-visible' which triggers our fade-in animation.
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      // The 'threshold' determines how much of the element must be visible
      // before the observer triggers. 0.1 means 10%.
      threshold: 0.1
    });

    // We tell the observer to watch each of our designated sections.
    sections.forEach(section => {
      observer.observe(section);
    });
  }


  // ===================================================================
  // 3. Google Form Submission Handler
  // ===================================================================
  // This code hijacks the normal form submission process to send data
  // to a Google Form in the background, without leaving the page.
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      // 'e.preventDefault()' stops the form from its default action,
      // which would be to navigate to a new page.
      e.preventDefault();

      // The updated Google Form URL ending in /formResponse.
      const formActionUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScabZFfwyByU9nKtabVQaFgp9rRGQwg9U5vRTvpwEkUZ6sqkw/formResponse';
      
      // We gather the data from the form fields.
      const formData = new FormData(contactForm);

      // We use the 'fetch' API to send the data to the Google Form URL.
      // The 'POST' method is used to send data.
      // 'mode: no-cors' is required to avoid Cross-Origin Resource Sharing errors,
      // as we are sending data to a different domain (google.com).
      fetch(formActionUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' 
      })
      .then(() => {
        // If the submission is successful (or at least, doesn't throw an error):
        // 1. We clear the form fields.
        contactForm.reset();
        // 2. We show the "Thank you" message.
        successMessage.classList.remove('hidden');
        // 3. We hide the success message again after 5 seconds for a clean UI.
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      })
      .catch((error) => {
        // If there's an error, we log it to the console for debugging.
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
      });
    });
  }
  
  // ===================================================================
  // 4. Office Bearer Scroller Logic
  // ===================================================================
  // This script handles the automatic scrolling and allows manual override.
  const scroller = document.querySelector('.scroller');

  if (scroller) {
    // A flag to ensure we only add the override class once.
    let isManuallyScrolled = false;

    const handleManualScroll = () => {
      if (!isManuallyScrolled) {
        isManuallyScrolled = true;
        // Add the class to permanently disable the CSS animation.
        scroller.classList.add('manual-override');
        // We can remove the listener now since its job is done.
        scroller.removeEventListener('scroll', handleManualScroll);
      }
    };
    
    // The 'scroll' event listener is key. It only fires on a user-initiated
    // scroll (mouse wheel, trackpad, touch drag), not on a CSS animation.
    scroller.addEventListener('scroll', handleManualScroll);
  }
});
