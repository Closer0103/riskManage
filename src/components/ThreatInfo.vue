<template>
    <div class="home">
        <el-main>

            <template>
                <el-table :data="listTable" style="width: 100%" :empty-text="'暂无数据'">
                    <el-table-column prop="IdentifiedObject" label="资产名称" width="180">
                    </el-table-column>
                    <el-table-column prop="create_time" label="识别时间" width="360">
                    </el-table-column>
                    <el-table-column label="查看详情" width="180">
                        <template slot-scope="scope">
                            <el-link @click="hclick(scope.row.create_time)">查看详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
                <el-card>
                    <el-container>
                        <span>当前识别对象为：</span>
                        <span style="color: rgb(230, 100, 100);">{{ this.IdentifiedObject }}</span>
                    </el-container>
                </el-card>

                <el-switch style="display: block" v-model="tableManMode" inactive-color="#13ce66" active-text="列表展示"
                    inactive-text="图表展示">
                </el-switch>

                <el-container v-if="tableManMode == true" style="display: flex;flex-direction: column;">
                    <h1 style="margin-left: 1vw;">威胁识别记录</h1>
                    <el-table :data="manOrgAttribute" style="width: 100%">
                        <el-table-column prop="name" label="属性名称" width="180">
                        </el-table-column>

                        <el-table-column prop="rank" label="属性等级" width="300">
                        </el-table-column>

                        <el-table-column prop="createDate" label="识别时间" width="300">
                        </el-table-column>

                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" @click="delAttribute(scope.$index)">删除属性</el-button>
                            </template>
                        </el-table-column>



                    </el-table>


                </el-container>

                <el-container v-if="tableManMode == false" style="display: flex;flex-direction: column;">
                    <h2>
                        <span style="color: blue;">威胁识别</span>
                        饼图
                    </h2>
                    <el-container>
                        <el-container id="pieChart1" style="height: 50vh;width: 20vw;"></el-container>
                        <!-- <el-container id="pieChart2" style="height: 50vh;width: 20vw;"></el-container> -->
                    </el-container>
                </el-container>




            </el-dialog>

        </el-main>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'ThreatInfo',
    data() {
        return {
            //顶部导航栏
            activeIndex: '3',
            dialogVisible: false,
            listTable: [],
            //识别对象
            IdentifiedObject: '',
            manOrgAttribute: [],
            tableManMode: true,
            current_i: 999,



        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getList();
        },
        getList() {
            this.listTable = JSON.parse(localStorage.getItem("ThreatIdentificationData"))
        },
        hclick(i) {
            console.log(i)
            for (var k in this.listTable) {
                if (this.listTable[k].create_time === i)
                    this.current_i = k
            }
            console.log(k)
            this.dialogVisible = true
            this.getData(this.current_i)
        },
        getData(i) {
            // 从会话存储中检索 JSON 字符串
            const jsonData = localStorage.getItem('ThreatIdentificationData');
            // 检查是否有存储的数据
            if (jsonData) {
                const ThreatIdentificationData = JSON.parse(jsonData)[i];
                this.IdentifiedObject = ThreatIdentificationData.IdentifiedObject;
                this.manOrgAttribute = ThreatIdentificationData.manOrgAttribute;
            }
        },
        delAttribute(index) {
            this.manOrgAttribute.splice(index, 1);
            this.submitVulnerability();
        },
        submitVulnerability() {
            const ThreatIdentificationData = {
                IdentifiedObject: this.IdentifyObjects_value,
                create_time: Date(),
                manOrgAttribute: this.manOrgAttribute,
            };
            sessionStorage.setItem('ThreatIdentificationData', JSON.stringify(ThreatIdentificationData));
            // localStorage.setItem('ThreatIdentificationData', JSON.stringify(ThreatIdentificationData));

        },
        async renderChart1(i) {
            await this.getData(i);
            const option1 = {
                title: {
                    text: "识别的威胁",
                    // left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.manOrgAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.manOrgAttribute.map(item => {
                            return {
                                value: 100 / this.manOrgAttribute.length,
                                name: item.name,
                            };
                        }),
                        label: {
                            show: false // 隐藏每个部分的文字标签
                        },
                        labelLine: {
                            show: false // 隐藏每个部分的延伸线
                        }
                    }
                ]
            };
            const pieChart1 = echarts.init(document.getElementById('pieChart1'));
            

            pieChart1.setOption(option1);
            


        }
    },
    watch: {
        tableManMode: {
            immediate: true, // 立即执行一次
            handler(newValue) {
                if (newValue === false) {
                    this.renderChart1(this.current_i);
                }
            },
        },
        current_i: {
            immediate: true, // 立即执行一次
            handler(newValue) {
                if (newValue === false) {
                    this.getData(this.current_i)
                }
            },
        },
    }
}




</script>