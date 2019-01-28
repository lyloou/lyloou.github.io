// 2015-04-04 copyright 2015 Xah Lee. If you use the code, please credit and link back http://xahlee.info/js/svg_clock.html

(function() {

    var hour_hand_length = 0.45; // ratio to radius of clock
    var minute_hand_length = 0.7; // ratio to radius of clock
    var sec_hand_length = 0.9; // ratio to radius of clock

    // create a svg tag
    var svg_container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_container.setAttribute("viewBox", "-1 -1 2 2");

    var clock_frame = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clock_frame.setAttribute("cx", 0);
    clock_frame.setAttribute("cy", 0);
    clock_frame.setAttribute("r", .97);
    clock_frame.setAttribute("style", "fill:none;stroke:black; stroke-width:2%");
    svg_container.appendChild(clock_frame);

    // draw hour marks
    for (var ii = 0;ii < 12; ii++) {
        var jj = 2 * Math.PI / 12 *ii;
        var hour_pos = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        hour_pos.setAttribute("cx", Math.cos(jj)*.9);
        hour_pos.setAttribute("cy", Math.sin(jj)*.9);
        hour_pos.setAttribute("r", "3%");
        hour_pos.setAttribute("style", "fill:black;stroke:none;");
        svg_container.appendChild(hour_pos);
    }

    // hour hand
    var hour_hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hour_hand.setAttribute("x1", 0);
    hour_hand.setAttribute("y1", 0);
    hour_hand.setAttribute("x2", 0);
    hour_hand.setAttribute("y2", -1 * hour_hand_length);
    hour_hand.setAttribute("style", "stroke:blue; stroke-width:5%;stroke-linecap:round");
    hour_hand.setAttribute("transform", "rotate(" + (((new Date()).getHours() % 12) * 30 + (new Date()).getMinutes() /2) +  ")");
    svg_container.appendChild(hour_hand);

    // minute hand
    var minute_hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minute_hand.setAttribute("x1", 0);
    minute_hand.setAttribute("y1", 0);
    minute_hand.setAttribute("x2", 0);
    minute_hand.setAttribute("y2", -1 * minute_hand_length);
    minute_hand.setAttribute("style", "stroke:red; stroke-width:3%;stroke-linecap:round");
    minute_hand.setAttribute("transform", "rotate(" + ((new Date()).getMinutes()*6) +  ")");
    svg_container.appendChild(minute_hand);

    var sec_hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sec_hand.setAttribute("x1", 0);
    sec_hand.setAttribute("y1", 0);
    sec_hand.setAttribute("x2", 0);
    sec_hand.setAttribute("y2", -1 * sec_hand_length);
    sec_hand.setAttribute("style", "stroke:black; stroke-width:1%;stroke-linecap:round");
    sec_hand.setAttribute("transform", "rotate(" + ((new Date()).getSeconds()*6) +  ")");
    svg_container.appendChild(sec_hand);

    // attach container to document
    document.getElementById("svg_clock_68390").appendChild(svg_container);

    function update_clock () {
        var dd = new Date();
        sec_hand.setAttribute("transform", "rotate(" + (dd.getSeconds()*6) +  ")");
        minute_hand.setAttribute("transform", "rotate(" + (dd.getMinutes()*6) +  ")");
        hour_hand.setAttribute("transform", "rotate(" + ((dd.getHours() % 12) * 30 + dd.getMinutes() /2) +  ")");
    };

    setInterval(update_clock, 1000);

})();
