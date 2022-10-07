
function drawHand() {
    let hand = new Image();
    hand.onload = () => {
        let canvas = document.getElementById('canvas');
        let cx = canvas.getContext('2d');
        cx.save();
        cx.translate(200,150);
        cx.rotate(-40*Math.PI/180);
        cx.translate(-200,-150);
        cx.drawImage(hand, 300, 160);
        cx.restore();
    };
    hand.src='pointing_hand.png';
}

var theWheel;
function setupWheel() {
    let fields = seniors.length;
    let wheelSegments = seniors.map( (s,i) => {
        s.fillStyle = colors[i];
        s.text = s.name;
        return s;
    });

    theWheel = new Winwheel({
        numSegments: fields,
        outerRadius: 270,
        centerY: 330,
        rotationAngle: -8,
        textFontSize: 14,
        textAlignment: 'outer',
        animation: {
            type: 'spinToStop',
            duration: 1,
            spins: 5,
            callbackFinished: 'findWinner()',
            callbackAfter: 'drawHand()'
            },
        segments : wheelSegments});
}

function spinWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = -8;
    theWheel.draw();
    theWheel.startAnimation();

}

function findWinner() {
    let winner = theWheel.getIndicatedSegment();
    let out = document.getElementById('winner');
    let ratio = winner.pubsAfter / (1+winner.totPubs);
    let epSize = Math.round(10*ratio*winner.hindex);
    let ep = `<h3>Your price is: <span style="font-size: ${epSize};">🍆</span></h3>`
    let text = `<b>${winner.name}</b> has a 🍆 of ${epSize}.
<br> Their h-index is <i>${winner.hindex}</i>, and the latest publication when they were first author was published in <i>${winner.latestFirstAuthor}</i>.
<br> <i>${Math.round(100*ratio)}%</i> of their publications have been written since.`;
    out.innerHTML = ep+text;
}
