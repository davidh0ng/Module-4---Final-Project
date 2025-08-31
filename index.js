console.log("index.js")

function popPopcorn1() {
    const container = document.getElementById('popcorn__container-1');
    const screenWidth = window.innerWidth;
    const centerX = (screenWidth / 4);

    for (let i = 0; i < 12; i++) {
        const img = document.createElement('img');
        img.src = './assets/—Pngtree—close up a single popcorn_20281691.png';
        img.className = 'popcorn';

        // Start near center bottom
        img.style.left = `${centerX - 20}px`;
        img.style.bottom = `0px`;

        // Random diagonal direction: left or right
        const direction = Math.random() < 0.5 ? -1 : 1;
        const xDistance = direction * (80 + Math.random() * 300); // 80-200px left/right
        const yDistance = -(120 + Math.random() * 80); // 120-200px up

        // Final position: opposite direction horizontally
        const xEnd = direction * (180 + Math.random() * 120); // opposite side
        const yEnd = 300 + Math.random() * 200; // 300-500px down from start

        img.style.setProperty('--pop-x', `${xDistance}px`);
        img.style.setProperty('--pop-y', `${yDistance}px`);
        img.style.setProperty('--pop-x-end', `${xEnd}px`);
        img.style.setProperty('--pop-y-end', `${yEnd}px`);

        img.style.animationDuration = `${1.5 + Math.random()}s`;

        container.appendChild(img);

        img.addEventListener('animationend', () => {
            img.remove();
        });
    }
}

function popPopcorn2() {
    const container = document.getElementById('popcorn__container-2');
    const screenWidth = window.innerWidth;
    const centerX = (screenWidth / 4)*3;

    for (let i = 0; i < 8; i++) {
        const img = document.createElement('img');
        img.src = './assets/—Pngtree—close up a single popcorn_20281691.png';
        img.className = 'popcorn';

        // Start near center bottom
        img.style.left = `${centerX - 20}px`;
        img.style.bottom = `0px`;

        // Random diagonal direction: left or right
        const direction = Math.random() < 0.5 ? -1 : 1;
        const xDistance = direction * (80 + Math.random() * 300); // 80-200px left/right
        const yDistance = -(120 + Math.random() * 80); // 120-200px up

        // Final position: opposite direction horizontally
        const xEnd = direction * (180 + Math.random() * 120); // opposite side
        const yEnd = 300 + Math.random() * 200; // 300-500px down from start

        img.style.setProperty('--pop-x', `${xDistance}px`);
        img.style.setProperty('--pop-y', `${yDistance}px`);
        img.style.setProperty('--pop-x-end', `${xEnd}px`);
        img.style.setProperty('--pop-y-end', `${yEnd}px`);

        img.style.animationDuration = `${1.5 + Math.random()}s`;

        container.appendChild(img);

        img.addEventListener('animationend', () => {
            img.remove();
        });
    }
}