<script>
import * as echarts from 'echarts';
export default {
    name: 'VulInfoView',
    data() {
        return {
            activeName: 'manage',
            activeIndex: '2',

            tableManMode:true,
            tableTecMode:true,

            AttributeName: '',
            AttributeRank: '',

            IdentifiedObject: '',

            //等级相关变量
            rankSetting:[],
            min_rank: 1,
            max_rank: 5,

            //管理脆弱性相关变量
            //组织管理脆弱性相关变量
            manOrgDialogVisible:false,
            manOrgAttribute: [],
            //技术管理脆弱性相关变量
            manTecAttribute: [],

            //技术脆弱性相关变量
            //应用系统脆弱性
            tecAppAttribute: [],
            //应用中间件脆弱性
            tecMidAttribute: [],
            //系统软件脆弱性
            tecSysAttribute: [],
            //网络结构脆弱性
            tecWebAttribute: [],
            //物理环境脆弱性
            tecEnvAttribute: [],
        };
    },
    mounted() {
        this.init();
    },
    watch: {
        // 监听 tableManMode 变化
        tableManMode: {
            immediate: true, // 立即执行一次
            handler(newValue) {
                if (newValue === false) {
                    this.renderChart1();
                }
            },
        },
        // 监听 tableTecMode 变化
        tableTecMode: {
            immediate: true, // 立即执行一次
            handler(newValue) {
                if (newValue === false) {
                    this.renderChart2();
                }
            },
        },
    },
    methods: {
        init(){
            this.getData();
            this.setRank();
        },
        getData(){
            // 从会话存储中检索 JSON 字符串
            const jsonData = sessionStorage.getItem('VulnerabilityData');
            // 检查是否有存储的数据
            if (jsonData) {
                // 解析 JSON 字符串为 JavaScript 对象
                const VulnerabilityData = JSON.parse(jsonData);
                this.IdentifiedObject = VulnerabilityData.IdentifiedObject;
                this.min_rank = VulnerabilityData.min_rank;
                this.max_rank = VulnerabilityData.max_rank;
                this.manOrgAttribute = VulnerabilityData.manOrgAttribute;
                this.manTecAttribute = VulnerabilityData.manTecAttribute;
                this.tecAppAttribute = VulnerabilityData.tecAppAttribute;
                this.tecMidAttribute = VulnerabilityData.tecMidAttribute;
                this.tecSysAttribute = VulnerabilityData.tecSysAttribute;
                this.tecWebAttribute = VulnerabilityData.tecWebAttribute;
                this.tecEnvAttribute = VulnerabilityData.tecEnvAttribute;
            }
        },
        setRank(){
            //设置自定义等级
            let i = this.min_rank;
            for (; i <= this.max_rank; i++) {
                this.rankSetting.push(
                    {
                        value: i,
                        label: '等级' + i,
                    }
                )
            }
        },
        async renderChart1() {
            await this.getData();
            const option1 = {
                title: {
                    text: "组织管理脆弱性",
                    left: 'center',
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
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const option2 = {
                title: {
                    text: "技术管理脆弱性",
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.manTecAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.manTecAttribute.map(item => {
                            return {
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const pieChart1 = echarts.init(document.getElementById('pieChart1'));
            const pieChart2 = echarts.init(document.getElementById('pieChart2'));

            pieChart1.setOption(option1);
            pieChart2.setOption(option2);
        },
        async renderChart2() {
            await this.getData();
            const option3 = {
                title: {
                    text: "应用系统脆弱性",
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.tecAppAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.tecAppAttribute.map(item => {
                            return {
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const option4 = {
                title: {
                    text: "应用中间件脆弱性",
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.tecMidAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.tecMidAttribute.map(item => {
                            return {
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const option5 = {
                title: {
                    text: "系统软件脆弱性",
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.tecSysAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.tecSysAttribute.map(item => {
                            return {
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const option6 = {
                title: {
                    text: "网络结构脆弱性",
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.tecWebAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.tecWebAttribute.map(item => {
                            return {
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const option7 = {
                title: {
                    text: "物理环境脆弱性",
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    position: [10, 10]
                },
                legend: {
                    data: this.tecEnvAttribute.map(item => item.name),
                    top: 25,
                },
                series: [
                    {
                        top: 35,
                        type: 'pie',
                        data: this.tecEnvAttribute.map(item => {
                            return {
                                value: parseInt(item.rank),
                                name: item.name,
                            };
                        }),
                    }
                ]
            };

            const pieChart3 = echarts.init(document.getElementById('pieChart3'));
            const pieChart4 = echarts.init(document.getElementById('pieChart4'));
            const pieChart5 = echarts.init(document.getElementById('pieChart5'));
            const pieChart6 = echarts.init(document.getElementById('pieChart6'));
            const pieChart7 = echarts.init(document.getElementById('pieChart7'));

            pieChart3.setOption(option3);
            pieChart4.setOption(option4);
            pieChart5.setOption(option5);
            pieChart6.setOption(option6);
            pieChart7.setOption(option7);
        },
        handlePush(index) {
            if (index == '1') {
                this.$router.push('/VulRec');
            }
            else if (index == '2') {
                //this.$router.push('/VulInfo');
            }
        },
    }
}
</script>

<template>
    <div class="home">
        <el-container>
            <el-header
                style="display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid;padding-bottom: 1vh;">
                <el-container class="website-title">
                    <i class="el-icon-key icon-set" size="1.2rem"></i>
                    安全风险评估系统
                </el-container>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="border: 0 !important;">
                    <el-menu-item index="1" @click="handlePush('1')">风险识别</el-menu-item>
                    <el-menu-item index="2" @click="handlePush('2')">风险信息总览</el-menu-item>
                    <el-menu-item index="3" @click="handlePush('3')">风险评估记录</el-menu-item>
                </el-menu>
                <el-container style="margin-left: 30vw;cursor: pointer;">| 登录 / 注册</el-container>
            </el-header>

            <el-container>

                <el-aside width="200px" style="border-top: 1px solid #e3e3e3;margin-top: 2.5vh;">
                    <el-menu default-active="3" style="height: 800px;margin-top: 2vh;">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">资产识别</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-document"></i>
                            <span slot="title">威胁识别</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-data-analysis"></i>
                            <span slot="title">脆弱性识别</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-first-aid-kit"></i>
                            <span slot="title">安全措施识别</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-tabs v-model="activeName" type="card">

                        <!-- 1 管理脆弱性 -->
                        <el-tab-pane label="管理脆弱性" name="manage">
                            
                            <el-switch
                                style="display: block"
                                v-model="tableManMode"
                                inactive-color="#13ce66"
                                active-text="列表展示"
                                inactive-text="图表展示">
                            </el-switch>
                            
                            <el-card style="margin-top: 2vh;">
                                <el-container>
                                    <span>当前识别对象为：</span>
                                    <span style="color: rgb(230, 100, 100);">{{ this.IdentifiedObject }}</span>
                                    <span style="margin-left: 4vw;">当前风险等级划分为：</span>
                                    <span style="color: rgb(230, 100, 100);margin-top: 0.4vh;">{{ this.min_rank }} - {{ this.max_rank }}</span>
                                </el-container>
                            </el-card>

                            <!--表格形式展示组织管理脆弱性-->
                            <el-card v-if="tableManMode==true" style="margin-top: 2vh;" shadow="always">
                                <h2>组织管理脆弱性</h2>
                                <el-table :data="manOrgAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible=true" type="text">修改</el-button>
                                            <el-button type="text">删除</el-button>        
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                            <!--表格形式展示技术管理脆弱性-->
                            <el-card v-if="tableManMode == true" style="margin-top: 2vh;" shadow="always">
                                <h2>技术管理脆弱性</h2>
                                <el-table :data="manTecAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible = true" type="text">修改</el-button>
                                            <el-button type="text">删除</el-button>        
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>

                            <!--图表形式展示管理脆弱性-->
                            <el-card v-if="tableManMode == false" style="margin-top: 2vh;">
                                <h2>
                                    管理脆弱性 
                                    <span style="color: blue;">属性-风险等级</span>
                                     扇形图
                                </h2>
                                <el-container>
                                    <el-container id="pieChart1" style="height: 50vh;width: 20vw;"></el-container>
                                    <el-container id="pieChart2" style="height: 50vh;width: 20vw;"></el-container>
                                </el-container>
                            </el-card>

                        </el-tab-pane>

                        <!-- 2 技术脆弱性 -->
                        <el-tab-pane label="技术脆弱性" name="technique">
                            
                            <el-switch
                                style="display: block"
                                v-model="tableTecMode"
                                inactive-color="#13ce66"
                                active-text="列表展示"
                                inactive-text="图表展示">
                            </el-switch>
                        
                            <el-card style="margin-top: 2vh;">
                                <el-container>
                                    <span>当前识别对象为：</span>
                                    <span style="color: rgb(230, 100, 100);">{{ this.IdentifiedObject }}</span>
                                    <span style="margin-left: 4vw;">当前风险等级划分为：</span>
                                    <span style="color: rgb(230, 100, 100);margin-top: 0.4vh;">{{ this.min_rank }} - {{ this.max_rank }}</span>
                                </el-container>
                            </el-card>

                            <!--表格形式展示应用系统脆弱性-->
                            <el-card v-if="tableTecMode == true" style="margin-top: 2vh;" shadow="always">
                                <h2>应用系统脆弱性</h2>
                                <el-table :data="tecAppAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible = true" type="text">修改</el-button>
                                            <el-button type="text">删除</el-button>        
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>

                            <!--表格形式展示应用中间件脆弱性-->
                            <el-card v-if="tableTecMode == true" style="margin-top: 2vh;" shadow="always">
                                <h2>应用中间件脆弱性</h2>
                                <el-table :data="tecMidAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible = true" type="text">修改</el-button>
                                            <el-button type="text">删除</el-button>        
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>

                            <!--表格形式展示系统软件脆弱性-->
                            <el-card v-if="tableTecMode == true" style="margin-top: 2vh;" shadow="always">
                                <h2>系统软件脆弱性</h2>
                                <el-table :data="tecSysAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible = true" type="text">修改</el-button>
                                            <el-button type="text">删除</el-button>        
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>

                            <!--表格形式展示网络结构脆弱性-->
                            <el-card v-if="tableTecMode == true" style="margin-top: 2vh;" shadow="always">
                                <h2>网络结构脆弱性</h2>
                                <el-table :data="tecWebAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible = true" type="text">修改</el-button>
                                            <el-button type="text">删除</el-button>        
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>

                            <!--表格形式展示物理环境脆弱性-->
                            <el-card v-if="tableTecMode == true" style="margin-top: 2vh;" shadow="always">
                                <h2>物理环境脆弱性</h2>
                                <el-table :data="tecEnvAttribute" border style="width: 40vw">
                                    <el-table-column prop="name" label="属性名称" width="400"/>
                                    <el-table-column prop="rank" label="风险等级"/>
                                    <el-table-column fixed="right" label="操作" width="100">
                                        <template>
                                            <el-button @click="manOrgDialogVisible = true" type="text">修改</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>

                            <!--图表形式展示技术脆弱性-->
                            <el-card v-if="tableTecMode == false" style="margin-top: 2vh;">
                                <h2>
                                    技术脆弱性 
                                    <span style="color: blue;">属性-风险等级</span>
                                        扇形图
                                </h2>
                                <el-container>
                                    <el-container id="pieChart3" style="height: 50vh;width: 20vw;"></el-container>
                                    <el-container id="pieChart4" style="height: 50vh;width: 20vw;"></el-container>
                                    <el-container id="pieChart5" style="height: 50vh;width: 20vw;"></el-container>
                                    <el-container id="pieChart6" style="height: 50vh;width: 20vw;"></el-container>
                                    <el-container id="pieChart7" style="height: 50vh;width: 20vw;"></el-container>
                                </el-container>
                            </el-card>

                        </el-tab-pane>

                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
.website-title{
    font-family: Microsoft Yahei;
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
}
.icon-set{
    margin-right: 0.5vw;
    margin-top: 0.5vh;
}
</style>