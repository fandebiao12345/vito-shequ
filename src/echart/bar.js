import echarts from 'echarts'
let getBarOption = (title, value) => {
  let  option = {
    grid: {
      top: "10%",
      left: "10%",
      right: "5%",
      bottom: "14%"
    },
    color: "#083963",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: [{
      type: "category",
      data: title,
      axisLabel: {
        interval: 0
      },
      data: title,
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: "#40c5d6"
        }
      }
    }],
    yAxis: [{
      minInterval: 1,
      type: "value",
      splitLine: false,
      axisLine: {
        lineStyle: {
          color: "#40c5d6"
        }
      }
    }],
    series: [{
        // For shadow
        type: "bar",

        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0.05)"
          }
        },
        barGap: "-100%",
        barCategoryGap: "40%",
        data: value,
        animation: false
      },
      {
        type: "bar",
        barWidth: "40px",
        itemStyle: {
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
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#2378f7"
              },
              {
                offset: 0.7,
                color: "#2378f7"
              },
              {
                offset: 1,
                color: "#83bff6"
              }
            ])
          }
        },
        data: value
      }
    ]
  }
  return option
}


export default getBarOption