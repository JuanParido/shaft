$(".mapcontainer").mapael({
            map: {
                name: "latin_america",
                defaultArea: {
                    attrs: {
                        fill: 'rgb(191, 191, 191)',
                        stroke: 'rgb(255, 255, 255)',
                        "stroke-width": 0.3,
                        "stroke-linejoin": "round"
                    },
                    attrsHover: {
                        fill: 'rgba(22, 203, 67, 0.95)',
                        // stroke: 'rgba(11, 103, 120, 0.95)',
                        "stroke-width": 0.8,
                    }
                },

                // zoom: {
                //         enabled: true,
                //         maxLevel : 4
                // },
                // height:200,
                // width:600,
            },
            legend: {
                area: {
                    title: "Population by country",
                    slices: [{
                        max: 300000,
                        attrs: {
                            fill: "#98edf9"
                        },
                        label: "Less than de 300 000 inhabitants"
                    }, {
                        min: 300000,
                        max: 500000,
                        attrs: {
                            fill: "#46e1f7"
                        },
                        label: "Between 100 000 and 500 000 inhabitants"
                    }, {
                        min: 500000,
                        max: 1000000,
                        attrs: {
                            fill: "#08bad4"
                        },
                        label: "Between 500 000 and 1 000 000 inhabitants"
                    }, {
                        min: 1000000,
                        attrs: {
                            fill: "#0b9db1"
                        },
                        label: "More than 1 million inhabitants"
                    }]
                }
            },
            areas: {

            }
        });

        $('#newDataForMap').click(function() {
            var co_value = Math.floor(Math.random() * 2000000) + 0;
            var br_value = Math.floor(Math.random() * 2000000) + 0;
            var pe_value = Math.floor(Math.random() * 2000000) + 0;
            var mx_value = Math.floor(Math.random() * 2000000) + 0;
            var cl_value = Math.floor(Math.random() * 2000000) + 0;

            console.log(co_value);

            options = {
                mapOptions: {
                    areas: {
                        "CO": {
                            value: co_value,
                            href: "#",
                            tooltip: {
                                content: "<span style=\"font-weight:bold;\">Colombia</span><br />Population : " + co_value
                            }
                        },
                        "BR": {
                            value: br_value,
                            href: "#",
                            tooltip: {
                                content: "<span style=\"font-weight:bold;\">Brazil</span><br />Population : " + br_value
                            }
                        },
                        "PE": {
                            value: pe_value,
                            href: "#",
                            tooltip: {
                                content: "<span style=\"font-weight:bold;\">Perú</span><br />Population : " + pe_value
                            }
                        },
                        "MX": {
                            value: mx_value,
                            href: "#",
                            tooltip: {
                                content: "<span style=\"font-weight:bold;\">México</span><br />Population : " + mx_value
                            }
                        },
                        "CL": {
                            value: cl_value,
                            href: "#",
                            tooltip: {
                                content: "<span style=\"font-weight:bold;\">Chile</span><br />Population : " + cl_value
                            }
                        },
                    }
                }
            };
            $(".mapcontainer").trigger('update', [options]);
        });

        function getCurrency(value) {

            if (parseInt(value) >= 1000) {
                value = Math.floor(value / 1000);
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K';
            } else {
                return '$' + value;
            }
        }

        myChart2Options = {
            type: 'horizontalBar',
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        display: false,
                    }]
                },
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },
                events: false,
                tooltips: {
                    // enabled: false
                },
                hover: {
                    // animationDuration: 0
                },
                maintainAspectRatio: false,
                animation: {
                    duration: 500,
                    easing: "easeOutQuart",
                    onComplete: function() {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(12, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';

                        this.data.datasets.forEach(function(dataset) {
                            for (var i = 0; i < dataset.data.length; i++) {
                                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                                var scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._xScale.maxWidth;
                                ctx.fillStyle = '#444';
                                var x_pos = model.x + 10;
                                // console.log(scale_max);
                                // console.log(model.x);
                                if (scale_max - model.x <= 50) {
                                    x_pos = model.x - 60;
                                    ctx.fillStyle = '#fff';
                                }
                                ctx.fillText(getCurrency(dataset.data[i]), x_pos, model.y);
                            }
                        });
                    }
                }
            }
        }
        myChart2Graph = null;

        function generateData() {
            var vars = Math.floor(Math.random() * 20) + 5;
            var labels = [];
            var data = [];
            for (var i = 1; i <= vars; i++) {
                labels.push(i)
                data.push(Math.floor(Math.random() * 2000000) + 0)
            }

            return {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: 'rgb(0, 216, 255)'
                }],
            }
        }

        $("#newDataForChart2").click(function() {
            if (myChart2Graph) {
                myChart2Graph.destroy();
            }
            var ctx = $("#myChart2");
            myChart2Options.data = generateData();
            $("#myChart2").attr("height", myChart2Options.data.labels.length * 40);
            myChart2Graph = new Chart(ctx, myChart2Options)

        });
        // -------------------------------------------------------------------
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    // label: '# of Votes',
                    data: [18000, 20000, 17000, 5000, 200, 0],
                    backgroundColor: [
                        'rgb(0, 216, 255)',
                        'rgb(0, 216, 255)',
                        'rgb(0, 216, 255)',
                        'rgb(0, 216, 255)',
                        'rgb(0, 216, 255)',
                        'rgb(0, 216, 255)',
                        // 'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    // borderColor: [
                    //     'rgba(255,99,132,1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
                    borderWidth: 1
                }]
            },
            options: {
                // responsive: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        // display: false,
                        ticks: {
                            min: 0,
                            max: 20000,
                            stepSize: 10000,
                            callback: function(value, index, values) {
                                return getCurrency(value);
                            }
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },
                events: false,
                tooltips: {
                    enabled: false
                },
                hover: {
                    animationDuration: 0
                },
                animation: {
                    duration: 500,
                    easing: "easeOutQuart",
                    onComplete: function() {
                        var ctx = this.chart.ctx;
                        ctx.font = Chart.helpers.fontString(12, 'normal', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset) {
                            for (var i = 0; i < dataset.data.length; i++) {
                                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                                    scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                                ctx.fillStyle = '#444';
                                var y_pos = model.y - 5;
                                // console.log(scale_max);
                                // console.log(model.y);
                                if ((scale_max - model.y) / scale_max >= 0.75) {
                                    y_pos = model.y + 25;
                                    ctx.fillStyle = '#fff';
                                }
                                ctx.fillText(getCurrency(dataset.data[i]), model.x, y_pos);
                            }
                        });
                    }
                }
            }
        });