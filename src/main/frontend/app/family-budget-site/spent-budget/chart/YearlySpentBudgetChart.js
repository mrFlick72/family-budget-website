import React from "react"
import * as d3 from "d3";

class YearlySpentBudgetChart extends React.Component {

    constructor(props) {
        super(props);

        this.min = this.min.bind(this);
        this.max = this.max.bind(this);
        this.padding = {left: 0, right: 0}
        this.draw = this.draw.bind(this)
    }

    min(data, selector) {
        return d3.min(data, (symbol) => {
            return symbol[selector];
        })
    };

    max(data, selector) {
        return d3.max(data, (symbol) => {
            return symbol[selector];
        })
    };

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        let {id, data} = this.props;
        let node = d3.select(`#${id}`).node().getBoundingClientRect();
        let father = d3.select(`#${id}`).node().parentNode.getBoundingClientRect();

        let xScale = d3.scaleLinear().domain([this.min(data, "x"), this.max(data, "x")]).range([0, node.width]);
        let yScale = d3.scaleLinear().domain([this.min(data, "y"), this.max(data, "y")]).range([0, node.height]);

        let line = d3.line()
            .x((data) => xScale(data.x))
            .y((data) => node.height - yScale(data.y));

        d3.select(`#${id}`)
            .append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("stroke-width", "1px")
            .attr("stroke", "#000")
            .attr("d", line(data))
            .attr("fill", "none");
        this.padding = {left: Math.abs(father.left), right: Math.abs(father.x)}
    }

    render() {
        let width = this.props.width || "100%"
        let height = this.props.height || "100%"
        return <div className="card">
            <div className="card-body">
                <h5 className="card-title">Yearly budget expense chart</h5>
                <div className="card-text">
                    <svg id={this.props.id}
                         style={{
                             "width": width,
                             "height": height,
                             "display": "block",
                             "padding-left": `${this.padding.left}px`,
                             "padding-right": `${this.padding.right}px`
                         }}>
                    </svg>
                </div>
            </div>
        </div>
    }
}

export default YearlySpentBudgetChart;