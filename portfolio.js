/**
 * Handles the contact form submission, prevents default, and performs basic validation.
 * @param {Event} event - The form submission event.
 */


// --- Navigation Active State Logic (To highlight the current section) ---

// Find all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#main-nav a');

// Create a new Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the section is intersecting (visible), find the corresponding nav link
            navLinks.forEach(link => {
                link.classList.remove('active'); // Remove active from all links
                // Match the link's href with the section's ID
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active'); // Add active to the current section's link
                }
            });
        }
    });
}, 
{
    // Root Margin helps adjust the trigger point (e.g., when 20% of the section is visible)
    // -80% top margin means the intersection starts when the top of the section is 80% down from the viewport top.
    rootMargin: '0px 0px -80% 0px', 
    threshold: 0
});

// Observe each section when the script loads
sections.forEach(section => {
    observer.observe(section);
});

 document.addEventListener("DOMContentLoaded", function () {

  // Init EmailJS once
  emailjs.init("4UcQuhP60_a6u_l_4");

  const form = document.getElementById("enquiry-form");
  const formMessage = document.getElementById("form-message");

  if (!form) {
    console.error("Form not found in DOM");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();   // 🔒 NO reload
    event.stopPropagation();

    formMessage.textContent = "";
    formMessage.className = "text-center fw-semibold";

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // 🔍 TEMP DEBUG ALERT (THIS MUST SHOW)
    alert("Submit handler is working");

    const params = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    emailjs.send("service_ewzhucf", "template_5ri8v2s", params)
      .then(() => {
        alert("✅ Mail sent successfully!");
        formMessage.textContent = "Thank you! Your message has been sent.";
        formMessage.classList.add("text-success");
        form.reset();
        form.classList.remove("was-validated");
      })
      .catch(err => {
        alert("❌ EmailJS failed (check console)");
        console.error("EmailJS error:", err);
      });
  });

}); 