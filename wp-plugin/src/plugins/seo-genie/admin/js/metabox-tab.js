(function( $ ) {
    'use strict';
 
    $(function() {
 
        function initTabs() {
            // Grab the wrapper for the Navigation Tabs
            var navTabs = $( '#page_keywords_navigation').children( '.nav-tab-wrapper' ),
                tabIndex = null;

            navTabs.first().children().first().addClass('nav-tab-active');
            $( '#page_keywords_navigation' ).children( 'div:nth-child(2)' ).removeClass( 'hidden' );
            renderCharts(0);

            navTabs.children().each(function() {
                $( this ).on( 'click', function( evt ) {
                    evt.preventDefault();
                    // If this tab is not active...
                    if ( ! $( this ).hasClass( 'nav-tab-active' ) ) {
                        // Unmark the current tab and mark the new one as active
                        $( '.nav-tab-active' ).removeClass( 'nav-tab-active' );
                        $( this ).addClass( 'nav-tab-active' );
                        // Save the index of the tab that's just been marked as active. It will be 0 - 3.
                        tabIndex = $( this ).index();
                        // Hide the old active content
                        $( '#page_keywords_navigation' )
                            .children( 'div:not( .inside.hidden )' )
                            .addClass( 'hidden' );
                        $( '#page_keywords_navigation' )
                            .children( 'div:nth-child(' + ( tabIndex ) + ')' )
                            .addClass( 'hidden' );
                        // And display the new content
                        $( '#page_keywords_navigation' )
                            .children( 'div:nth-child( ' + ( tabIndex + 2 ) + ')' )
                            .removeClass( 'hidden' );
                        renderCharts(tabIndex);
                    }
                });

                $( this ).find('i').on( 'click', function( evt ) {
                    evt.preventDefault();
                    var tabIndex = $(this).closest('.nav-tab').index();
                    $(this).closest('.nav-tab').remove();
                    $( '#page_keywords_navigation' ).children( 'div:nth-child(' + ( tabIndex + 2 ) + ')' ).remove();
                    initTabs();
                });
            });
        }

        initTabs();

        // Bootstrap select
        $('.keyword-picker').selectpicker();

        function renderCharts(index) {
            // Highchart Line
            Highcharts.chart('keyword_chart_line' + index, {
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: 'Google',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: 'Bing',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Yahoo',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });

            // Highchart gause
            /**
             * In the chart render event, add icons on top of the circular shapes
             */
            function renderIcons() {
                // Move icon
                if (!this.series[0].icon) {
                    this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .add(this.series[2].group);
                }
                this.series[0].icon.translate(
                    this.chartWidth / 2 - 10,
                    this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
                        (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
                );

                // Exercise icon
                if (!this.series[1].icon) {
                    this.series[1].icon = this.renderer.path(
                        ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                            'M', 8, -8, 'L', 16, 0, 8, 8]
                        )
                        .attr({
                            'stroke': '#ffffff',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .add(this.series[2].group);
                }
                this.series[1].icon.translate(
                    this.chartWidth / 2 - 10,
                    this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
                        (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
                );

                // Stand icon
                if (!this.series[2].icon) {
                    this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .add(this.series[2].group);
                }

                this.series[2].icon.translate(
                    this.chartWidth / 2 - 10,
                    this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
                        (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
                );
            }

            Highcharts.chart('keyword_chart_gauge' + index, {
                chart: {
                    type: 'solidgauge',
                    height: '110%',
                    events: {
                        render: renderIcons
                    }
                },
                title: {
                    text: 'keyword Performances',
                    style: {
                        fontSize: '16px'
                    }
                },
                tooltip: {
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '16px'
                    },
                    pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                    positioner: function (labelWidth) {
                        return {
                            x: (this.chart.chartWidth - labelWidth) / 2,
                            y: (this.chart.plotHeight / 2) + 15
                        };
                    }
                },
                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    background: [{ // Track for Move
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }, { // Track for Exercise
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }, { // Track for Stand
                        outerRadius: '62%',
                        innerRadius: '38%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0
                    }]
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: false
                        },
                        linecap: 'round',
                        stickyTracking: false,
                        rounded: true
                    }
                },
                series: [{
                    name: 'Move',
                    data: [{
                        color: Highcharts.getOptions().colors[0],
                        radius: '112%',
                        innerRadius: '88%',
                        y: 80
                    }]
                }, {
                    name: 'Exercise',
                    data: [{
                        color: Highcharts.getOptions().colors[1],
                        radius: '87%',
                        innerRadius: '63%',
                        y: 65
                    }]
                }, {
                    name: 'Stand',
                    data: [{
                        color: Highcharts.getOptions().colors[2],
                        radius: '62%',
                        innerRadius: '38%',
                        y: 50
                    }]
                }]
            });

            // Highchart time series
            $.getJSON(
                'https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/usdeur.json',
                function (data) {

                    Highcharts.chart('keyword_chart_series' + index, {
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: 'Traffic'
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: 'Unique users'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: [{
                            type: 'area',
                            name: 'Users',
                            data: data
                        }]
                    });
                }
            );
        }
    });
 
})( jQuery );