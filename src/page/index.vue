<template>
  <div id="app">
    <div class="left">
      <div class="wing wing-left">
        <div class="title">设备总数</div>
        <div class="num">{{iotCount.cur}}</div>
      </div>
      <div v-for="item in left" :key="item.title" class="module_1">
        <a :href="item.href?item.href:'javascript:;'" class="title">
          {{item.title}}
        </a>
        <div class="score">
          <div>总分</div>
          <div>
            <span class="num">{{item.cur}}</span>
            <span class="unit">分</span>
          </div>
        </div>
        <div class="detail">
          <a :href="it.href?it.href:'javascript:;'" v-for="(it,index) in item.classify" :key="index" class="item">
            <img :src="it.img" alt="">
            <div class="config">
              <div>{{it.title}}</div>
              <div>
                <span class="num">{{it.cur}}</span>分</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="wing wing-right">
        <div class="title">当日监测上报总数</div>
        <div class="num">{{totalReport.cur}}</div>
      </div>
      <div v-for="item in right" :key="item.title" class="module_1">
        <a :href="item.href?item.href:'javascript:;'" class="title">
          {{item.title}}
        </a>
        <div class="score">
          <div>总分</div>
          <div>
            <span class="num">{{item.cur}}</span>
            <span class="unit">分</span>
          </div>
        </div>
        <div class="detail">
          <a :href="it.href?it.href:'javascript:;'" v-for="(it,index) in item.classify" :key="index" class="item">
            <img :src="it.img" alt="">
            <div class="config">
              <div>{{it.title}}</div>
              <div>
                <span class="num">{{it.cur}}</span>分</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="center" style="top: 50px">
      <div class="num-left">
        <div class="title">当日告警总数</div>
        <div class="num">
          <div v-for="(item, index) in warningCount" :key="index" :class="['num_item', item==','?'fuhao':'']">{{item}}</div>
        </div>
      </div>
      <div class="num-right">
        <div class="title">当日处理总数</div>
        <div class="num">
          <div v-for="(item, index) in dealCount" :key="index" :class="['num_item', item==','?'fuhao':'']">{{item}}</div>
        </div>
      </div>
      <div class="main">
        <div class="title">海淀区城市运行管理平台</div>
        <div class="time_date">
          <div>{{date}}</div>
          <div>{{nowtime}}</div>
        </div>
        <div class="content">
          <div class="detail">
            <div class="detail-left">
              <div class="title">
                <span>设备告警信息</span>
                <div class="title_right">
                  <div class="item">
                    <img :src="require('../assets/images/qingdu.png')" alt="">
                    <span>轻度</span>
                  </div>
                  <div class="item">
                    <img :src="require('../assets/images/zhongdu.png')" alt="">
                    <span>中度</span>
                  </div>
                  <div class="item">
                    <img :src="require('../assets/images/zhongduu.png')" alt="">
                    <span>重度</span>
                  </div>
                </div>
              </div>
              <div class="wrap">
                <div class="list" ref="list">
                  <a ref="item" target="_blank" :href="item.href" v-for="(item, index) in warn" class="list_item">
                    <img :src="item.img" alt="">
                    <div class="detail">
                      <div class="content">{{item.content}}</div>
                      <div class="date_time">
                        <span class="date">{{item.date}}</span>
                        <span class="time">{{item.time}}</span>
                      </div>
                    </div>
                  </a>
                  <a ref="item" target="_blank" v-if="warn.length > 4" :href="item.href" v-for="(item, index) in warn" class="list_item">
                    <img :src="item.img" alt="">
                    <div class="detail">
                      <div class="content">{{item.content}}</div>
                      <div class="date_time">
                        <span class="date">{{item.date}}</span>
                        <span class="time">{{item.time}}</span>
                      </div>
                    </div>
                  </a>

                </div>
              </div>
            </div>
            <div :class="{center: true, init: init}">
              <div ref="init" :class="{bg: true, init: init}">
                <a :href="host + '/framework/operationMonitoring/index.html'"></a>
                <a href=""></a>
                <a href="./environment.html"></a>
                <a href="javascript:;"></a>
                <a href="javascript:;"></a>
                <a href="javascript:;"></a>
              </div>
              <div @click="handleInit" :class="{title: true}">城市健康成绩</div>
              <div class="score">
                {{total.cur}}
                <span class="unit">分</span>
              </div>
            </div>
            <div class="detail-right">
              <div class="title">案件处理排名</div>
              <div class="list" ref="mechanismsEl">
                <div class="list_item" v-for="item in mechanisms" :key="item.ORGNAME">
                  <span class="text"> {{item.ORGNAME}}</span>
                  <div class="progress">
                    <div :style="{width: item.width?item.width:0}" class="inner"></div>
                  </div>
                  <span class="num">{{item.cur}}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="echart">
          <div class="echart_item">
            <div class="title">感知问题时间分布</div>
            <div id="polyline"></div>
          </div>
          <div class="echart_item">
            <div class="title">设备报警类型分布</div>
            <div id="pillar"></div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <a :href="host + '/framework/bigdata2/index.html?alias=dsjfx1&src=unicom/workerAnalysis.html&name=%E5%B7%A5%E4%BD%9C%E4%BA%BA%E5%8F%A3'"
          class="item item_left">
          <div class="title">工作人口</div>
          <div class="num">{{gzrk.cur}}</div>
        </a>
        <a :href="host + '/framework/bigdata2/index.html?alias=dsjfx1&src=unicom/compareAnalysis.html&name=%E5%B1%85%E4%BD%8F%E4%BA%BA%E5%8F%A3'"
          class="item item_center">
          <div class="title">居住人口</div>
          <div class="num">{{jzrk.cur}}</div>
        </a>
        <a :href="host + '/framework/bigdata2/index.html?alias=dsjfx1&src=unicom/roaderAnalysis.html&name=%E8%BF%87%E8%B7%AF%E4%BA%BA%E5%8F%A3'"
          class="item item_right">
          <div class="title">过路人口</div>
          <div class="num">{{lgrk.cur}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Miment from "miment";
  import echarts from "echarts";
  import axios from "axios";
  import getBarOption from "../echart/bar";
  import getPolyOption from "../echart/polyline";
  export default {
    data() {
      return {
        left: [{
            title: "井盖",
            fin: 90,
            cur: 0,
            href: window.location.origin +
              "/framework/operationMonitoring/index.html",
            classify: [{
                img: require("../assets/images/paishui.png"),
                cur: 0,
                title: "排水",
                fin: 90,
                href: ""
              },
              {
                img: require("../assets/images/gongdian.png"),
                cur: 0,
                title: "供电",
                fin: 92
              },
              {
                img: require("../assets/images/gongre.png"),
                cur: 0,
                title: "供热",
                fin: 92
              },
              {
                img: require("../assets/images/tongxun.png"),
                cur: 0,
                title: "通讯",
                fin: 92
              }
            ]
          },
          {
            title: "环廊",
            fin: 80,
            cur: 0,
            href: "",
            classify: [{
                img: require("../assets/images/yiyanghuatan.png"),
                cur: 0,
                title: "一氧化碳",
                fin: 85
              },
              {
                img: require("../assets/images/liuhuaqing.png"),
                cur: 0,
                title: "硫化氢",
                fin: 78
              },
              {
                img: require("../assets/images/jiawan.png"),
                cur: 0,
                title: "甲烷",
                fin: 76
              },
              {
                img: require("../assets/images/anqi.png"),
                cur: 0,
                title: "氨气",
                fin: 83
              }
            ]
          }

        ],
        isStart: true,
        right: [{
            title: "人口",
            fin: 80,
            cur: 0,
            href: "",
            classify: [{
                img: require("../assets/images/fangwugaunli.png"),
                cur: 0,
                title: "房屋管理",
                fin: 90
              },
              {
                img: require("../assets/images/renkouguanli.png"),
                cur: 0,
                title: "人口管理",
                fin: 92
              }
            ]
          },
          {
            title: "消防",
            fin: 90,
            cur: 0,
            href: "./firefighting.html",
            classify: [{
                img: require("../assets/images/xiaofanganquan.png"),
                cur: 0,
                title: "消防栓水位",
                fin: 90,
                href: ''
              },
              {
                img: require("../assets/images/dianqi.png"),
                cur: 0,
                title: "电器安全",
                fin: 92
              },
              {
                img: require("../assets/images/yangan.png"),
                cur: 0,
                title: "烟感",
                fin: 90,
                href: ""
              },
              {
                img: require("../assets/images/meiqixielou.png"),
                cur: 0,
                title: "燃气泄露",
                fin: 92
              }
            ]
          }
        ],
        timer1: null,
        timer2: null,
        init: false,
        totalReport: {
          cur: 0,
          total: 0
        },
        iotCount: {
          cur: 0,
          fin: 0
        },
        dealCount: [],
        warn: [],
        time: 800,
        total: {
          cur: 0,
          fin: 80
        },

        gzrk: {
          cur: 0,
          fin: 23574
        },
        jzrk: {
          cur: 0,
          fin: 85120
        },
        lgrk: {
          cur: 0,
          fin: 0
        },
        isMove: false,
        date: Miment().format("YYYY.MM.DD"),
        nowtime: Miment().format("hh:mm:ss"),
        mechanisms: [],
        warnings: {
          total: [],
          report: []
        },
        host: window.location.origin
      };
    },
    computed: {
      warningCount() {
        let warningCount;
        if (this.warn.length) {
          warningCount = this.warn.length;
          let reg = /\B(?=(\d{3})+$)/g;

          warningCount = warningCount.toString().replace(reg, ",");

          warningCount = warningCount.split("");
        } else {
          warningCount = [0];
        }

        return warningCount;
      }
    },

    methods: {
      getData() {
        return new Promise(async (resolve, reject) => {
          var host =
            process.env.NODE_ENV == "production" ?
            window.location.origin :
            "http://192.168.0.67:8080";

          let host2 =
            process.env.NODE_ENV == "production" ? window.location.origin : "/api";
          let data = {};
          data.startTime = `${Miment().format("YYYY-MM-DD")} 00:00:00`;
          data.endTime = `${Miment()
        .add(1, "DD")
        .format("YYYY-MM-DD")} 00:00:00`;
          let res = await axios.get(
            host +
            "/dataShared/iotequipment/getiotofcmcc/getWarningCount.ht?userCode=manager&passWord=321321", {
              params: data
            }
          );

          let res1 = await axios.get(host2 + "/bigData/DataMining/getLTreal.ht", {
            params: {
              time: `${Miment().format("YYYY-MM-DD")} 00:00:00`
            }
          });

          let res2 = await axios.get(host2 + '/bigData/DataMining/getLTuserGZsum.ht?orgid=&time=2018-04')
          console.log(res2)
          try {
            let lgrk = res1.data.data[res1.data.data.length - 1].dataArr[0].value;
            this.lgrk.fin = lgrk;
          } catch (e) {
            console.log(e);
          }

          let dealCount = res.data.dealCount ? res.data.dealCount : [];
          let iotCount = res.data.iotCount;
          let iotwarning = res.data.iotwarning ? res.data.iotwarning : [];
          let reg = /\B(?=(\d{3})+$)/g;

          dealCount = dealCount.toString().replace(reg, ",");

          this.dealCount = dealCount.split("");

          this.totalReport.fin = res.data.dataCount;
          this.iotCount.fin = res.data.iotCount;
          if (res.data.dealRank) {
            let dealRank = res.data.dealRank.map(item => {
              item.finwidth = item.NUM * 100 / res.data.dealCount - 6 + "%";
              item.width = 0;
              item.cur = 0;
              item.fin = item.NUM;
              return item;
            });
            this.mechanisms = dealRank;
          }
          this.warn = iotwarning.map(item => {
            let obj = {};
            obj.content = item.WARNINGS;
            obj.time = item.DATADATE.split(" ")[0];
            obj.date = item.DATADATE.split(" ")[1];
            obj.img = require("../assets/images/qingdu.png");
            obj.href =
              this.host + "/framework/command/index.html?id=" + item.REPORTID;
            return obj;
          });
          this.$nextTick(() => {
            if (this.warn.length > 4) this.initCarousel();
          });
          this.initNum();

          if (res.data.typeCount) {
            let title1 = res.data.typeCount.map(item => item.NAME);
            let value1 = res.data.typeCount.map(item => item.NUM);

            var pillar = document.getElementById("pillar");
            var myChart2 = echarts.init(pillar);
            let barOption = getBarOption(title1, value1);

            myChart2.setOption(barOption);
          }
          var polyline = document.getElementById("polyline");
          var myChart = echarts.init(polyline);
          let data1 = res.data.periodCount ? res.data.periodCount : [];
          let arr = new Array(25);
          let temp = [];
          for (let i = 0; i < arr.length; i++) {
            let obj = {};
            obj.NUM = 0;

            obj.PERIOD = i > 9 ? i : "0" + i;
            temp.push(obj);
          }

          temp.forEach((item, index) => {
            data1.forEach((it, i) => {
              if (item.PERIOD == it.PERIOD) {
                temp[index].NUM = it.NUM;
              }
            });
          });

          let title2 = temp.map(item => item.PERIOD);
          let value2 = temp.map(item => item.NUM);

          let polyOption = getPolyOption(title2, value2);

          myChart.setOption(polyOption);
          resolve()
        })
      },
      setTime() {
        setInterval(() => {
          this.nowtime = Miment().format("hh:mm:ss");
        }, 1000);
      },

      numActice(el, ks, js, time) {
        let count = Math.ceil(time / 17);

        let unit =
          Math.abs(Math.round((js - ks) / count)) < 1 ?
          1 :
          Math.abs(Math.round((js - ks) / count));
        if (js - ks > 0) {
          let timer1 = setInterval(() => {
            if (el.cur + unit > js) {
              clearInterval(timer1);
              el.cur = js;
              return;
            }
            el.cur += unit;
          }, 17);
        } else {
          let timer1 = setInterval(() => {
            if (el.cur - unit < js) {
              clearInterval(timer1);
              el.cur = js;
              return;
            }
            el.cur -= unit;
          }, 17);
        }
      },
      initNum() {
        this.numActice(this.totalReport, 0, this.totalReport.fin, 800);
        this.numActice(this.iotCount, 0, this.iotCount.fin, 800);
        this.numActice(this.gzrk, 0, this.gzrk.fin, 800);
        this.numActice(this.jzrk, 0, this.jzrk.fin, 800);
        this.numActice(this.lgrk, 0, this.lgrk.fin, 800);
        this.numActice(this.total, 0, this.total.fin, 800);

        this.left.forEach(item => {
          this.numActice(item, item.cur, item.fin, 800);
          item.classify.forEach(i => {
            this.numActice(i, i.cur, i.fin, 800);
          });
        });
        this.right.forEach(item => {
          this.numActice(item, item.cur, item.fin, 800);
          item.classify.forEach(i => {
            this.numActice(i, i.cur, i.fin, 800);
          });
        });
        setTimeout(() => {
          this.mechanisms = this.mechanisms.map(item => {
            item.width = item.finwidth;
            item.cur = item.fin;
            return item;
          });
        });
      },
      async handleInit() {
        if (this.isMove) {
          return;
        }

        this.isMove = true;

        this.left.forEach(item => {
          item.cur = 0;
          item.classify.forEach(i => {
            i.cur = 0;
          });
        });
        this.right.forEach(item => {
          item.cur = 0;
          item.classify.forEach(i => {
            i.cur = 0;
          });
        });
        this.total.cur = 0;
        this.gzrk.cur = 0;
        this.jzrk.cur = 0;
        this.lgrk.cur = 0;
        this.iotCount.cur = 0;
        this.totalReport.cur = 0;


        let init = this.$refs.init;

        init.style.transition = "all 2s";

        setTimeout(() => {
          getComputedStyle(init, null);
          this.init = true;

          setTimeout(() => {
            init.style.transition = "";

            setTimeout(() => {
              this.init = false;
              this.isMove = false;
            });
          }, 2000);
        })
        await this.getData()
        this.initNum();
      },
      setTranslate(el, translateY) {
        el.style.transform = `translateY(${translateY}px)`;
      },
      initCarousel() {
        if(!this.isStart) return
        this.isStart = false
        let h = 80;

        let list = this.$refs.list;
        let nowNum = 1;
        list.style.transition = "all 1s linear";
        getComputedStyle(list, null).transition;
        list.addEventListener("transitionend", () => {
          setTimeout(() => {
            nowNum++;
            if (nowNum == this.warn.length * 2 - 4) {
              list.style.transition = "";
              nowNum = 1;
              this.setTranslate(list, 0);
              getComputedStyle(list, null).transform;
              list.style.transition = "all 1s linear";
              getComputedStyle(list, null).transition;
              this.setTranslate(list, nowNum * -h);
              return;
            }
            this.setTranslate(list, nowNum * -h);
          }, 4000);
        });
        setTimeout(() => {
          this.setTranslate(list, nowNum * -h);
        }, 2000);
      }
    },
    created() {
      this.setTime();
    },
    async mounted() {
      await this.getData();
      let $ = {};
      $.monitorSocket = {
        websocket: null,
        connect: function (onMessageCallback, orgpath) {
          let protocol = "";
          if (/https/.test(location.protocol)) {
            protocol = "wss://";
          } else {
            protocol = "ws://";
          }

          var host =
            protocol +
            (process.env.NODE_ENV == "production" ?
              window.location.host :
              "192.168.0.30:8080/DDS");

          if ("WebSocket" in window) {
            var websocket = new WebSocket(
              host +
              "/webSocketServer.ht?userid=10000048290012&orgid=10000007780000&controlRun=controlRun" +
              (!orgpath ? "" : "&orgpath=" + orgpath)
            );
            websocket.onopen = function (evnt) {
              console.log("连接成功");
            };
            websocket.onmessage = function (evnt) {
              var obj = JSON.parse(evnt.data);

              onMessageCallback ? onMessageCallback(obj) : $.messagecallback(obj);
            };
            websocket.onerror = function (evnt) {};
            websocket.onclose = function (evnt) {};
          }
        },
        close: function () {
          if ("WebSocket" in window) {
            if (!window.websocket) return;
            websocket.close();
          }
        }
      };

      $.monitorSocket.connect(viewData => {
        var m = viewData.rows[0];
        if (m.fromtype == "iotwarning") {
          console.log(m);
          let obj = {};
          obj.content = m.warning;
          obj.time = m.dataDate.split(" ")[0];
          obj.date = m.dataDate.split(" ")[1];
          if (this.warn.length > 30) {
            this.warn.shift();
          }
          this.warn.push(obj);

          this.$nextTick(() => {
            if (this.warn.length > 4) this.initCarousel();
          });
        }
      });

      this.timer2 = setInterval(() => {
        let js = this.total.cur + parseInt(-5 + Math.random() * 10);
        if (js < 30) {
          js = 30;
        }
        if (js > 100) {
          js = 100;
        }
        this.total.cur = js;
      }, 3000);
      this.timer3 = setInterval(() => {
        let js = (this.gzrk.cur += parseInt(-100 + Math.random() * 200));
        if (js < 0) {
          js = 1574;
        }
        if (js > 40000) {
          js = 35984;
        }
        this.gzrk.cur = js;
      }, 3000);
      this.timer4 = setInterval(() => {
        let js = (this.jzrk.cur += parseInt(-1000 + Math.random() * 2000));
        if (js < 0) {
          js = 1574;
        }
        if (js > 100000) {
          js = 98545;
        }
        this.jzrk.cur = js;
      }, 3000);
    }
  };

</script>

<style lang="css">
  a {
    display: block;
    text-decoration: none;
  }

  body,
  html,
  #app {
    padding: 0;
    margin: 0;
    width: 1920px;
    height: 1080px;
    position: relative;
  }

  #app {
    background: url("../assets/images/bg.jpg") no-repeat;
    background-size: 1920px 1080px;
    transform: translateY(0.01);
  }

  .left {
    position: absolute;
    left: 20px;
    top: 50px;
  }

  .right {
    position: absolute;
    right: 20px;
    top: 50px;
  }

  .module_1 {
    height: 349px;
    width: 335px;
    background: url("../assets/images/module_1.png") no-repeat;
    background-size: 335px 349px;
    margin-top: 86px;
  }

  .module_1>.title {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
  }

  .module_1>.score {
    height: 68px;
    align-items: center;
    color: #46d5e5;
    width: 104px;
    margin: 0 auto;
    display: flex;
    font-size: 18px;
    justify-content: space-between;
  }

  .module_1>.score .num {
    font-size: 22px;
  }

  .module_1>.score .unit {
    font-size: 14px;
  }

  .module_1>.detail {
    width: 276px;
    height: 116px;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
  }

  .module_1>.detail>.item {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    height: 45px;
    min-width: 106px;
  }

  .module_1>.detail>.item>img {
    width: 30px;
    height: 30px;
    margin-right: 24px;
  }

  .module_1>.detail>.item>.config {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #46d5e5;
    font-size: 14px;
  }

  .module_1>.detail>.item>.config .num {
    font-size: 20px;
  }

  .wing {
    width: 320px;
    height: 120px;
    background-size: 320px 120px;
    background-repeat: no-repeat;
  }

  .wing-left {
    background-image: url("../assets/images/wing-left.png");
  }

  .wing-right {
    background-image: url("../assets/images/wing-right.png");
  }

  .wing>.title {
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    color: #fff;
  }

  .wing>.num {
    height: 52px;
    line-height: 52px;
    font-size: 32px;
    color: #fff;
  }

  .wing-left>.title {
    text-align: right;
    padding-right: 40px;
  }

  .wing-right>.title {
    text-align: left;
    padding-left: 40px;
  }

  .wing-left>.num {
    padding-left: 62px;
  }

  .wing-right>.num {
    text-align: right;
    padding-right: 62px;
  }

  .center {
    width: 1246px;
    margin: 0 auto;
    position: relative;
  }

  .center>.main {
    background: url("../assets/images/waikuang.gif") no-repeat;
    background-size: 1246px;
    height: 818px;
  }

  .center>.bottom {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 50px;
    width: 1146px;
  }

  .center>.bottom>.item {
    width: 320px;
    height: 120px;
    background-size: 320px 120px;
    background-repeat: no-repeat;
  }

  .center>.bottom>.item>.title {
    text-align: center;
    height: 32px;
    line-height: 32px;
    color: #fff;
    font-size: 18px;
  }

  .center>.bottom>.item>.num {
    height: 50px;
    line-break: 50px;
    color: #fff;
    font-size: 40px;
    text-align: center;
  }

  .center>.bottom .item_left {
    background-image: url("../assets/images/wing-left.png");
  }

  .center>.bottom .item_right {
    background-image: url("../assets/images/wing-right.png");
  }

  .center>.bottom .item_center {
    background-image: url("../assets/images/zhongjian.png");
  }

  .main>.title {
    font-size: 32px;
    line-height: 32px;
    height: 32px;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }

  .main>.time_date {
    width: 530px;
    justify-content: space-between;
    height: 10px;
    line-height: 10px;
    font-size: 10px;
    margin: 0 auto;
    margin-top: 26px;
    color: #fff;
    display: flex;
  }

  .main>.content {
    width: 1100px;
    padding-top: 50px;
    margin: 0 auto;
  }

  .main>.content>.detail {
    display: flex;
    justify-content: space-between;
    height: 370px;
  }

  .main>.content>.detail>.center {
    height: 370px;
    width: 370px;
    margin: 0;
    position: relative;
  }

  .main>.content>.detail>.center>.bg {
    transform: rotate(0);
    /* transition: all 2s; */
    height: 370px;
    width: 370px;
    background: url("../assets/images/chengshijiankang.png") no-repeat;
    background-size: 370px 370px;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
  }

  .main>.content>.detail>.center>.bg>a {
    position: absolute;
    width: 160px;
    height: 25px;
    top: 50%;
    left: 50%;
    margin-top: -12.5px;
    margin-left: -80px;
    display: block;
    z-index: 999;
    cursor: pointer;
  }

  .main>.content>.detail>.center>.bg>a:nth-child(1) {
    transform: rotate(-30deg) translateY(-165px);
  }

  .main>.content>.detail>.center>.bg>a:nth-child(2) {
    transform: rotate(-90deg) translateY(-165px);
  }

  .main>.content>.detail>.center>.bg>a:nth-child(3) {
    transform: rotate(-150deg) translateY(-165px);
  }

  .main>.content>.detail>.center>.bg>a:nth-child(4) {
    transform: rotate(-210deg) translateY(-165px);
  }

  .main>.content>.detail>.center>.bg>a:nth-child(5) {
    transform: rotate(-270deg) translateY(-165px);
  }

  .main>.content>.detail>.center>.bg>a:nth-child(6) {
    transform: rotate(-330deg) translateY(-165px);
  }

  .main>.content>.detail>.center>.bg.init {
    transform: rotate(720deg);
  }

  .main>.content>.detail>.center>.title {
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 auto;
    margin-top: 133px;
    color: #fff;
    font-size: 18px;
    background: url("../assets/images/bg-title.png") no-repeat;
    background-position: center center;
    background-size: 238px 32px;
    cursor: pointer;
    position: relative;
    z-index: 10;
    width: 245px;
  }

  .main>.content>.detail>.center>.score {
    height: 100px;
    line-height: 100px;
    color: #fff;
    text-align: center;
    font-size: 60px;
    font-weight: bold;
    position: relative;
    /* position: absolute; */
  }

  .main>.content>.detail>.center>.score>.unit {
    font-size: 18px;
    position: absolute;
    top: 20px;
  }

  .main>.content>.detail>.detail-right {
    background: rgba(0, 87, 109, 0.3);
    width: 335px;
  }

  .main>.content>.detail>.detail-right>.title {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    color: #fff;
    font-size: 14px;
    background: #00576d;
  }

  .main>.content>.detail>.detail-right>.list {
    padding: 0 18px;
    margin-top: 17px;
  }

  .main>.content>.detail>.detail-right>.list>.list_item {
    height: 16px;
    display: flex;
    /* justify-content: space-between; */
    color: #46d5e5;
    font-size: 14px;
    align-items: center;
    margin-top: 29px;
    position: relative;
  }

  .main>.content>.detail>.detail-right>.list>.list_item>.text {
    width: 80px;
  }

  .main>.content>.detail>.detail-right>.list>.list_item>.num {
    position: absolute;
    right: 0;
  }

  .main>.content>.detail>.detail-right>.list>.list_item>.progress {
    width: 170px;
    height: 16px;
    background-image: url("../assets/images/progress.png");
    background-repeat: no-repeat;
    background-size: 170px 16px;
  }

  .main>.content>.detail>.detail-right>.list>.list_item>.progress>.inner {
    width: 80%;
    background: #46d5e5;
    height: 5px;
    margin-top: 5px;
    border-radius: 2.5px;
    margin-left: 8px;
    position: relative;
    transition: all 0.8s linear;
  }

  .main>.content>.detail>.detail-right>.list>.list_item>.progress>.inner::before {
    background: #93f4ff;
    position: absolute;
    height: 7px;
    width: 7px;
    content: "";
    left: -3.5px;
    top: -1px;
    border-radius: 50%;
  }

  .main>.content>.detail>.detail-left {
    background: rgba(0, 87, 109, 0.3);
    width: 335px;
  }

  .main>.content>.detail>.detail-left>.title {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    height: 32px;
    background: #00576d;
    color: #fff;
  }

  .main>.content>.detail>.detail-left .title_right {
    display: flex;
    align-items: center;
  }

  .main>.content>.detail>.detail-left .title_right>.item {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-left: 14px;
  }

  .main>.content>.detail>.detail-left .title_right>.item>img {
    width: 18px;
    margin-right: 6px;
  }

  .main>.content>.detail>.detail-left .wrap {
    padding: 0 10px;
    height: 330px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .main>.content>.detail>.detail-left .list {}

  .main>.content>.detail>.detail-left .list .list_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    border-bottom: 1px dashed #6bbfff;
    box-sizing: border-box;
    cursor: pointer;
  }

  .main>.content>.detail>.detail-left .list>.list_item>img {
    width: 35px;
  }

  .main>.content>.detail>.detail-left .list>.list_item>.detail {
    width: 258px;
  }

  .main>.content>.detail>.detail-left .list>.list_item>.detail>.content {
    height: 14px;
    line-height: 14px;
    color: #39b5c8;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main>.content>.detail>.detail-left .list>.list_item>.detail>.date_time {
    margin-top: 15px;
    font-size: 10px;
    height: 10px;
    line-height: 10px;
    color: #0083a4;
    text-align: right;
  }

  .num-left {
    position: absolute;
    width: 340px;
    left: 8px;
    top: 10px;
  }

  .num-left>.title {
    height: 38px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }

  .num-left>.num {
    margin-top: 7px;
    display: flex;
    justify-content: center;
  }

  .num-left>.num>.num_item {
    width: 35px;
    height: 50px;
    box-sizing: border-box;
    border: 2px solid #55ccda;
    text-align: center;
    line-height: 46px;
    color: #fff;
    font-size: 24px;
    text-shadow: 1px 1px #ff9422, -1px -1px #ff9422;
    margin-right: 6px;
  }

  .num-left>.num>.fuhao {
    border-color: transparent;
    width: 10px;
  }

  .num-left>.num>.douhao {
    margin: 0 4px;
    color: #fff;
    font-size: 24px;
    line-height: 50px;
    text-shadow: 1px 1px #ff9422, -1px -1px #ff9422;
  }

  .num-right {
    position: absolute;
    width: 340px;
    right: 8px;
    top: 10px;
  }

  .num-right>.title {
    height: 38px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }

  .num-right>.num {
    margin-top: 7px;
    display: flex;
    justify-content: center;
  }

  .num-right>.num>.num_item {
    width: 35px;
    height: 50px;
    box-sizing: border-box;
    border: 2px solid #55ccda;
    text-align: center;
    line-height: 46px;
    color: #fff;
    font-size: 24px;
    text-shadow: 1px 1px #ff9422, -1px -1px #ff9422;
    margin-right: 6px;
  }

  .num-right>.num>.fuhao {
    border-color: transparent;
    width: 10px;
  }

  .num-right>.num>.douhao {
    margin: 0 4px;
    color: #fff;
    font-size: 24px;
    line-height: 50px;
    text-shadow: 1px 1px #ff9422, -1px -1px #ff9422;
  }

  .echart {
    display: flex;
    justify-content: space-between;
    width: 1100px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .echart_item {
    width: 526px;
    height: 226px;
    background: rgba(0, 87, 109, 0.3);
  }

  .echart_item>.title {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    color: #fff;
    font-size: 14px;
    background: #00576d;
  }

  #polyline,
  #pillar {
    height: 194px;
  }

</style>
