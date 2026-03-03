gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    const car = document.getElementById("car");
    const trail = document.getElementById("trail");
    const letters = gsap.utils.toArray(".value-letter");
    const valueAdd = document.getElementById("valueText");

    // The SVG is 200×200px. After -90deg rotation the visual
    // width on screen equals the SVG height = 200px.
    const roadWidth = window.innerWidth;
    const carWidth = 200;           // SVG width = visual length direction
    const endX = roadWidth - carWidth - 10;

    // Snapshot each letter's left offset relative to road
    const valueRect = valueAdd.getBoundingClientRect();
    const letterOffsets = letters.map((l) => l.offsetLeft);

    /* ── Car + pin ──────────────────────────────────────────── */
    gsap.to(car, {
        scrollTrigger: {
            trigger: ".section",
            start: "top top",
            end: "bottom top",   // 400vh section → 300vh of actual scroll
            scrub: true,
            pin: ".track",
        },
        x: endX,
        ease: "none",

        onUpdate() {
            const carX = gsap.getProperty(car, "x") + carWidth / 2;

            // Reveal each letter as the car centre passes it
            letters.forEach((letter, i) => {
                const lx = valueRect.left + letterOffsets[i];
                letter.style.opacity = carX >= lx - 5 ? "1" : "0";
            });

            // Grow the neon trail behind the car
            gsap.set(trail, { width: carX });
        },
    });

    /* ── Stat cards ─────────────────────────────────────────── */
    const vh = window.innerHeight;

    [
        { id: "#box1", factor: 0.6 },
        { id: "#box2", factor: 1.0 },
        { id: "#box3", factor: 1.4 },
        { id: "#box4", factor: 1.8 },
    ].forEach(({ id, factor }) => {
        const start = vh * factor;
        gsap.to(id, {
            scrollTrigger: {
                trigger: ".section",
                start: `top+=${start} top`,
                end: `top+=${start + 200} top`,
                scrub: true,
            },
            opacity: 1,
        });
    });

});
