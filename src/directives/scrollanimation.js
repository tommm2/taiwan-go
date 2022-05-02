export default {
  mounted(el, binding) {
    let options = binding.value;
    let delay = 0;
    let type = "fade-down";

    if (options) {
      delay = options.delay ?? 0;
      type = options.type ?? "fade-down";
    }

    const animatedScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(type);
            setTimeout(() => {
              entry.target.classList.remove(type);
              entry.target.classList.remove(`before-${type}`);
            }, 1000);
          }, delay);

          animatedScrollObserver.unobserve(entry.target);
        }
      });
    });

    el.classList.add(`before-${type}`);

    animatedScrollObserver.observe(el);
  },
};
