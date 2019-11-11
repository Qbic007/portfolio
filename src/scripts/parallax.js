import constants from '../styles/variables.json';

const mainParallax = document.querySelector('.parallax');
const mainLayers = mainParallax.children;
console.log(mainParallax);
console.log(mainLayers);

const leavesParallax = document.querySelector('.leaves-parallax');
const leaves = leavesParallax.children;

function moveLayersDependsOnScroll(layers, wScroll) {
    Array.from(layers).forEach((layer) => {
        const coefficient = 2;
        const divider = layer.dataset.speed;
        const offset = -wScroll / divider * coefficient;
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
}

window.addEventListener('scroll', () => {
    if (window.innerWidth < parseInt(constants['bp-tablets'])) {
        return;
    }
    const wScroll = window.pageYOffset;

    const isMainParallax = window.innerHeight > wScroll;
    if (isMainParallax) {
        moveLayersDependsOnScroll(mainLayers, wScroll);
    }

    const {top} = leavesParallax.getBoundingClientRect();
    const leavesParallaxOffset = window.innerHeight - top;
    if (leavesParallaxOffset > 0) {
        moveLayersDependsOnScroll(leaves, leavesParallaxOffset);
    }
});
