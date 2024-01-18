<template>
    <div class="home">
        <menu-frame top-index="1" :is-show-aside="true" aside-index="2">

            <el-main>

                <!--输入识别对象-->
                <el-card style="margin-bottom: 2vh;" shadow="hover">
                    <el-container style="width: 70vw;">
                        <span style="margin-top: 1vh;width: 10vw;">请确认识别对象</span>
                        <el-select v-model="IdentifyObjects_value" placeholder="请选择" style="width: 25vw;" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in IdentifyObjectst_option" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-container>
                </el-card>

                <!--输入威胁名称-->
                <el-card style="margin-bottom: 2vh;" shadow="hover">
                    <el-container style="width: 70vw;">
                        <span style="margin-top: 1vh;width: 10vw;">请输入威胁对象</span>
                        <el-input v-model="threats.name"  placeholder="请输入威胁名称"
                            style="width: 25vw;" clearable></el-input>

                    </el-container>
                </el-card>

                <el-card shadow="always">

                    <!--卡片标题-->
                    <el-container>
                        <h2 style="width:15vw">威胁评估</h2>
                    </el-container>

                    <el-container>
                        <h3 style="width:15vw">威胁种类</h3>
                        <el-select v-model="threats.value_category" placeholder="请选择" class="input-select" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in options_category" :key="item.value" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>

                    </el-container>

                    <el-container>
                        <h3 style="width:15vw">威胁来源</h3>
                        <el-select v-model="threats.value_sources" placeholder="请选择" class="input-select" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in options_sources" :key="item.value" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>

                    </el-container>

                    <el-container>
                        <h3 style="width:15vw">威胁动机</h3>
                        <el-select v-model="threats.value_motivation" placeholder="请选择" class="input-select" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in options_motivation" :key="item.value" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>

                    </el-container>

                    <el-container>
                        <h3 style="width:15vw">威胁时机</h3>
                        <el-select v-model="threats.value_timing" placeholder="请选择" class="input-select" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in options_timing" :key="item.value" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>

                    </el-container>

                    <el-container>
                        <h3 style="width:15vw">威胁能力</h3>
                        <el-select v-model="threats.value_ability" placeholder="请选择" class="input-select" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in options_ability" :key="item.value" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>

                    </el-container>

                    <el-container>
                        <h3 style="width:15vw">威胁频率</h3>
                        <el-select v-model="threats.value_frequency" placeholder="请选择" class="input-select" filterable
                            allow-create default-first-option>
                            <el-option v-for="item in options_frequency" :key="item.value" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>

                    </el-container>


                </el-card>

                <el-button type="primary" style="margin-top: 1vh;" @click="submitVulnerability()">提交</el-button>


            </el-main>



        </menu-frame>
    </div>
</template>


<script>
import MenuFrame from "@/components/MenuFrame.vue";

export default {
    name: 'ThreatView',
    components: { MenuFrame},
    data() {
        return {
            threats: {
                name: '',
                value_category: '',
                value_sources: '',
                value_motivation: '',
                value_timing: '',
                value_ability: '',
                value_frequency: '',
                value_DIY: '',
            },

            options_category: [{
                value: "选项一",
                label: "物理损害",
            }, {
                value: "选项二",
                label: "自然损害",
            }, {
                value: "选项三",
                label: "技术失效",
            }, {
                value: "选项四",
                label: "自行输入",
            }
            ],

            options_sources: [{
                value: "选项一",
                label: "环境",
            }, {
                value: "选项二",
                label: "意外",
            }, {
                value: "选项三",
                label: "人为",
            }, {
                value: "选项四",
                label: "自行输入",
            }],

            options_motivation: [{
                value: "选项一",
                label: "恶意",
            }, {
                value: "选项二",
                label: "非恶意",
            }, {
                value: "选项三",
                label: "自行输入",
            }],

            options_timing: [{
                value: "选项一",
                label: "普通时期",
            }, {
                value: "选项二",
                label: "特殊时期",
            }, {
                value: "选项三",
                label: "自然规律",
            }, {
                value: "选项四",
                label: "自行输入",
            }],

            options_ability: [{
                value: "选项一",
                label: "高",
            }, {
                value: "选项二",
                label: "中",
            }, {
                value: "选项三",
                label: "低",
            }, {
                value: "选项四",
                label: "自行输入",
            }],


            options_frequency: [{
                value: "选项一",
                label: "很高",
            }, {
                value: "选项二",
                label: "高",
            }, {
                value: "选项三",
                label: "中",
            }, {
                value: "选项四",
                label: "低",
            }, {
                value: "选项五",
                label: "很低",
            }, {
                value: "选项六",
                label: "自行输入",
            }],

            options_DIY: [{
                value: "选项一",
                label: "自行输入",
            }],

            IdentifyObjectst_option: [{
                value: "选项一",
                label: "识别对象一",
            }, {
                value: "选项二",
                label: "识别对象二",
            }, {
                value: "选项三",
                label: "识别对象三",
            }, {
                value: "选项四",
                label: "识别对象四",
            }, {
                value: "选项五",
                label: "识别对象五",
            }],
            manOrgDialogVisible: false,
            card_option: [],
            IdentifyObjects_value: '',


        }
    },
    methods: {
        onCancle() {
            window.location.reload();
        },
        menujump() {
            this.$router.push({ path: "/" });
        },



        submitVulnerability() {
            var test = localStorage.getItem("ThreatIdentificationData")
            var VulList = JSON.parse(test)
            // 检查 VulList 是否为数组，如果不是，初始化为空数组
            if (!Array.isArray(VulList)) {
                VulList = [];
            }
            console.log("threast"); 
            console.log(this.threats);
            
            // console.log(this.threats.name);
            // console.log(this.threats.value_category);
            const ThreatIdentificationData = {
                IdentifiedObject: this.IdentifyObjects_value,
                create_time: Date(),
                threats: this.threats,
            };

            console.log(ThreatIdentificationData.threats);


            VulList.push(ThreatIdentificationData)
            localStorage.setItem('ThreatIdentificationData', JSON.stringify(VulList));
            this.$message({
                message: '成功提交！',
                type: 'success'
            });
            // location.reload();

        },



        //mouted
        pd() {
            var test = localStorage.getItem("ThreatIdentificationData")
            if (test == null)
                localStorage["ThreatIdentificationData"] = "[]"
        },


    },

    mounted() {
        // this.getIdentifiedOptions()
        this.pd()
    },

}
</script>


<style>
.submit-button-create {
    width: 120px;
    height: 30px;
    /* margin-left: 50px; */
    margin-right: 80px;
    margin-top: 100px;
}

.submit-button-cancle {
    width: 120px;
    height: 30px;

}

.submit-button-cancle:hover {
    /* width: 120px;
    height: 30px; */
    background-color: red;
    color: white;

}

.input-select {
    width: 300px;
    /* margin-top: 30px; */
    margin-bottom: 50px;
}


.box-card {
    width: 300px;
    margin-bottom: 30px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.customize-button-add {
    margin-left: 120px;
}

.delete-customize-button {
    margin-right: 100px;
}
</style>