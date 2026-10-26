const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');
const portfolioCount = document.getElementById('portfolioCount');

if (portfolioFilters.length && portfolioCards.length && portfolioCount) {
    portfolioFilters.forEach((filterButton) => {
        filterButton.addEventListener('click', () => {
            const selectedCategory = filterButton.dataset.filter;
            let visibleCount = 0;

            portfolioFilters.forEach((button) => {
                const isActive = button === filterButton;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            portfolioCards.forEach((card) => {
                const isVisible = selectedCategory === 'all'
                    || card.dataset.category === selectedCategory;
                card.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            portfolioCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'concept' : 'concepts'}`;
        });
    });
}
