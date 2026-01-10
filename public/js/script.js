// Add subtle animation to cards on page load
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });
});

// Auto Counter Animation

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  let started = false; // prevent repeat animation

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => startCount(counter));
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(document.querySelector(".achievements-section"));

  function startCount(counter) {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.innerText.replace(/\d/g, "");
    let count = 0;
    const speed = target / 100;

    const updateCount = () => {
      if (count < target) {
        count += speed;
        counter.innerText = Math.ceil(count) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCount();
  }
});
