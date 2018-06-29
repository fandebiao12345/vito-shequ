import echarts from 'echarts'

let getPolyOption = (title, value) => {
  let option = {
    color: "#083963",
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      }
    },
    series: [{
      name: "感知问题",
      type: "line",
      symbol: "none",
      sampling: "average",
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#00d9f4"
            },
            {
              offset: 1,
              color: "#052d49"
            }
          ])
        }
      },
      data: value
    }],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: title,
      axisLine: {
        lineStyle: {
          color: "#40c5d6"
        }
      }
    },
    yAxis: {
      minInterval: 1,
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#40c5d6"
        }
      },
      splitLine: false
    },
    grid: {
      top: "10%",
      left: "10%",
      right: "5%",
      bottom: "14%"
    }
  }
  return option
}

export default getPolyOption