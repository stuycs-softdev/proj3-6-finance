Raphael.fn.donutChart = function (cx, cy, r, r2, values, labels, colors, stroke) {
	//values = [values[0],values[1]];
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad), y1 = cy + r * Math.sin(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad), y2 = cy + r * Math.sin(-endAngle * rad);
        var x3 = cx + r2 * Math.cos(-startAngle * rad), y3 = cy + r2 * Math.sin(-startAngle * rad),
            x4 = cx + r2 * Math.cos(-endAngle * rad), y4 = cy + r2 * Math.sin(-endAngle * rad);
        //return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
        return paper.path(["M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2,
						   "L", x4, y4, "A", r2, r2, 0, +(startAngle - endAngle > 180), 1, x3, y3, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
			var w = paper.width;
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                ms = 200,
                delta = 30,
                color = colors[j], //Raphael.hsb(start, .75, 1),
                bcolor = colors[j], //Raphael.hsb(start, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "<>");
                txt.stop().animate({"font-size":paper.width/15}, ms, ">");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "<>");
                txt.stop().animate({"font-size":paper.width/17}, ms, "<");
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
			paper.rect(w*0.07, w+j*w*0.1, w*0.07,w*0.07, w*0.009).attr("fill",bcolor);
			var txt = paper.text(w*0.18, w*1.03+j*w*0.1,labels[j])
				.attr({fill: "#000", stroke: "none", opacity: 1, "font-size": paper.width/17,"text-anchor":"start"})
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

