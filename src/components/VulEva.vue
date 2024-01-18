<!--这是风险评估记录模块下脆弱性识别的评估记录页面-->
<script>
export default {
    name: 'VulEva',
    data() {
        return {
            //顶部导航栏
            activeIndex:'3',
          dialogVisible:false,
          listTable:[],
            //识别对象
            IdentifiedObject: '',

            //等级相关变量
            min_rank: 1,
            max_rank: 5,

            //管理脆弱性相关变量
            manAvg:[],
            //组织管理脆弱性相关变量
            manOrgAvg:[],
            manOrgAttribute: [],
            //技术管理脆弱性相关变量
            manTecAvg:[],
            manTecAttribute: [],

            //技术脆弱性相关变量
            tecAvg:[],
            //应用系统脆弱性
            tecAppAvg:[],
            tecAppAttribute: [],
            //应用中间件脆弱性
            tecMidAvg:[],
            tecMidAttribute: [],
            //系统软件脆弱性
            tecSysAvg:[],
            tecSysAttribute: [],
            //网络结构脆弱性
            tecWebAvg:[],
            tecWebAttribute: [],
            //物理环境脆弱性
            tecEnvAvg:[],
            tecEnvAttribute: [],

            //脆弱性评估总数据
            vulAvg:[],

            //控制两个显示窗口
            detailDialogVisible1:false,
            detailDialogVisible2:false,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
      init() {
        this.getList();
      },
      hclick(i){
        console.log(i)
        for(var k in this.listTable)
        {
          if (this.listTable[k].create_time === i)
            this.current_i = k
        }
        console.log(k)
        this.dialogVisible = true
        this.getData(this.current_i)
      },
      getList() {
        this.listTable = JSON.parse(localStorage.getItem("VulnerabilityData"))
      },
        getData(i) {
            // 从会话存储中检索 JSON 字符串
            const jsonData = localStorage.getItem('VulnerabilityData');
            // 检查是否有存储的数据
            if (jsonData) {
                // 解析 JSON 字符串为 JavaScript 对象
                const VulnerabilityData = JSON.parse(jsonData)[i];
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
            this.manOrgAvg=[{
                'name':'组织管理脆弱性',
                'avgRank1':this.calAvgRank1(this.manOrgAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.manOrgAttribute)),
                'avgRank2':this.calAvgRank2(this.manOrgAttribute),
                'evaRank2': this.evaRank(this.calAvgRank2(this.manOrgAttribute)),
            }];
            this.manTecAvg = [{
                'name': '技术管理脆弱性',
                'avgRank1': this.calAvgRank1(this.manTecAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.manTecAttribute)),
                'avgRank2': this.calAvgRank2(this.manTecAttribute),
                'evaRank2': this.evaRank(this.calAvgRank2(this.manTecAttribute)),
            }]; 
            this.tecAppAvg = [{
                'name': '应用系统脆弱性',
                'avgRank1': this.calAvgRank1(this.tecAppAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.tecAppAttribute)),
                'avgRank2': this.calAvgRank2(this.tecAppAttribute),
                'evaRank2': this.evaRank(this.calAvgRank2(this.tecAppAttribute)),
            }];
            this.tecMidAvg = [{
                'name': '应用中间件脆弱性',
                'avgRank1': this.calAvgRank1(this.tecMidAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.tecMidAttribute)),
                'avgRank2': this.calAvgRank2(this.tecMidAttribute),
                'evaRank2': this.evaRank(this.calAvgRank2(this.tecMidAttribute)),
            }];
            this.tecSysAvg = [{
                'name': '系统软件脆弱性',
                'avgRank1': this.calAvgRank1(this.tecSysAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.tecSysAttribute)),
                'avgRank2': this.calAvgRank2(this.tecSysAttribute),
                'evaRank2': this.evaRank(this.calAvgRank2(this.tecSysAttribute)),
            }];
            this.tecWebAvg = [{
                'name': '网络结构脆弱性',
                'avgRank1': this.calAvgRank1(this.tecWebAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.tecWebAttribute)),
                'avgRank2': this.calAvgRank2(this.tecWebAttribute),
                'evaRank2': this.evaRank(this.calAvgRank2(this.tecWebAttribute)),
            }];
            this.tecEnvAvg = [{
                'name': '物理环境脆弱性',
                'avgRank1':this.calAvgRank1(this.tecEnvAttribute),
                'evaRank1':this.evaRank(this.calAvgRank1(this.tecEnvAttribute)),
                'avgRank2':this.calAvgRank2(this.tecEnvAttribute),
                'evaRank2':this.evaRank(this.calAvgRank2(this.tecEnvAttribute)),
            }];

            this.manAvg=[{
                'name':'管理脆弱性',
                'avgRank1':Math.floor((this.calAvgRank1(this.manOrgAttribute) + this.calAvgRank1(this.manTecAttribute))/2),
                'evaRank1':this.evaRank(Math.floor((this.calAvgRank1(this.manOrgAttribute) + this.calAvgRank1(this.manTecAttribute)) / 2)),
                'avgRank2':Math.floor((this.calAvgRank2(this.manOrgAttribute) + this.calAvgRank2(this.manTecAttribute))/2),
                'evaRank2':this.evaRank(Math.floor((this.calAvgRank2(this.manOrgAttribute) + this.calAvgRank2(this.manTecAttribute)) / 2)),
            }];
            this.tecAvg=[{
                'name':'技术脆弱性',
                'avgRank1':Math.floor((this.calAvgRank1(this.tecAppAttribute) + this.calAvgRank1(this.tecMidAttribute) + this.calAvgRank1(this.tecSysAttribute) + this.calAvgRank1(this.tecWebAttribute) + this.calAvgRank1(this.tecEnvAttribute)) /5),
                'evaRank1':this.evaRank(Math.floor((this.calAvgRank1(this.tecAppAttribute) + this.calAvgRank1(this.tecMidAttribute) + this.calAvgRank1(this.tecSysAttribute) + this.calAvgRank1(this.tecWebAttribute) + this.calAvgRank1(this.tecEnvAttribute)) / 5)),
                'avgRank2':Math.floor((this.calAvgRank2(this.tecAppAttribute) + this.calAvgRank2(this.tecMidAttribute) + this.calAvgRank2(this.tecSysAttribute) + this.calAvgRank2(this.tecWebAttribute) + this.calAvgRank2(this.tecEnvAttribute)) / 5),
                'evaRank2':this.evaRank(Math.floor((this.calAvgRank2(this.tecAppAttribute) + this.calAvgRank2(this.tecMidAttribute) + this.calAvgRank2(this.tecSysAttribute) + this.calAvgRank2(this.tecWebAttribute) + this.calAvgRank2(this.tecEnvAttribute)) / 5)),
            }];

            this.vulAvg=[{
                name:'脆弱性',
                'avgRank1': Math.floor((this.calAvgRank1(this.manOrgAttribute) + this.calAvgRank1(this.manTecAttribute) + this.calAvgRank1(this.tecAppAttribute) + this.calAvgRank1(this.tecMidAttribute) + this.calAvgRank1(this.tecSysAttribute) + this.calAvgRank1(this.tecWebAttribute) + this.calAvgRank1(this.tecEnvAttribute)) / 7),
                'evaRank1': this.evaRank(Math.floor((this.calAvgRank1(this.manOrgAttribute) + this.calAvgRank1(this.manTecAttribute) + this.calAvgRank1(this.tecAppAttribute) + this.calAvgRank1(this.tecMidAttribute) + this.calAvgRank1(this.tecSysAttribute) + this.calAvgRank1(this.tecWebAttribute) + this.calAvgRank1(this.tecEnvAttribute)) / 7)),
                'avgRank2': Math.floor((this.calAvgRank2(this.manOrgAttribute) + this.calAvgRank2(this.manTecAttribute) + this.calAvgRank2(this.tecAppAttribute) + this.calAvgRank2(this.tecMidAttribute) + this.calAvgRank2(this.tecSysAttribute) + this.calAvgRank2(this.tecWebAttribute) + this.calAvgRank2(this.tecEnvAttribute)) / 7),
                'evaRank2': this.evaRank(Math.floor((this.calAvgRank2(this.manOrgAttribute) + this.calAvgRank2(this.manTecAttribute) + this.calAvgRank2(this.tecAppAttribute) + this.calAvgRank2(this.tecMidAttribute) + this.calAvgRank2(this.tecSysAttribute) + this.calAvgRank2(this.tecWebAttribute) + this.calAvgRank2(this.tecEnvAttribute)) / 7)),
            }];
        },
        calAvgRank1(attributeArray){
            if (!attributeArray || attributeArray.length === 0) {
                return 0; // 如果数组为空或未定义，返回0
            }

            const totalRank1 = attributeArray.reduce((total, attribute) => total + attribute.rank1, 0);
            const averageRank1 = Math.floor(totalRank1 / attributeArray.length);
            return averageRank1;
        },
        calAvgRank2(attributeArray) {
            if (!attributeArray || attributeArray.length === 0) {
                return 0; // 如果数组为空或未定义，返回0
            }

            const totalRank2 = attributeArray.reduce((total, attribute) => total + attribute.rank2, 0);
            const averageRank2 = Math.floor(totalRank2 / attributeArray.length);
            return averageRank2;
        },
        evaRank(rank) {
            if(rank==0){
                return '暂未评估';
            }
            else if(rank==1){
                return '很低';
            }
            else if(rank==2){
                return '低';
            }
            else if(rank==3){
                return '中等';
            }
            else if(rank==4){
                return '高';
            }
            else if(rank==5){
                return '很高'
            }
        },
        handlePush(index) {
            if (index == '1') {
                this.$router.push('/vulRec');
            }
            else if (index == '2') {
                this.$router.push('/VulInfo');
            }
            else if(index == '3'){
                //this.$router.push('/vulEva');
            }
        },
    }
}
</script>

<template>
    <div class="home">
      <el-table
          :data="listTable"
          style="width: 100%">
        <el-table-column
            prop="IdentifiedObject"
            label="资产名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="识别时间"
            width="360">
        </el-table-column>
        <el-table-column
            label="查看详情"
            width="180">
          <template slot-scope="scope">
            <el-link @click="hclick(scope.row.create_time)">查看详情</el-link>
          </template>
        </el-table-column>
      </el-table>
<el-dialog title="详情"
           :visible.sync="dialogVisible"
           width="80%">
      <el-main>

                    <el-card>
                        <el-container>
                            <span>当前评估对象为：</span>
                            <span style="color: rgb(230, 100, 100);">{{ this.IdentifiedObject }}</span>
                            <span style="margin-left: 4vw;">当前风险等级划分为：</span>
                            <span style="color: rgb(230, 100, 100);margin-top: 0.4vh;">{{ this.min_rank }} - {{
                                this.max_rank }}</span>
                        </el-container>
                    </el-card>

                    <el-container style="display: flex;flex-direction: column;">
                        <h1 style="margin-left: 1vw;">脆弱性评估记录</h1>
                        <el-table
                            :data="vulAvg"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="avgRank1"
                                label="被利用难易程度等级"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="evaRank1"
                                label="被利用难易程度"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="avgRank2"
                                label="被利用影响等级"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="evaRank2"
                                label="被利用影响"
                                width="200">
                            </el-table-column>
                        </el-table>

                        <h1 style="margin-left: 1vw;">管理脆弱性评估记录</h1>
                        <el-table
                            :data="manAvg"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="avgRank1"
                                label="被利用难易程度等级"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="evaRank1"
                                label="被利用难易程度"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="avgRank2"
                                label="被利用影响等级"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="evaRank2"
                                label="被利用影响"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100">
                                <template>
                                    <el-button type="text" @click="detailDialogVisible1=true">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <h1 style="margin-left: 1vw;">技术脆弱性评估记录</h1>
                        <el-table
                            :data="tecAvg"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="avgRank1"
                                label="被利用难易程度等级"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="evaRank1"
                                label="被利用难易程度"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="avgRank2"
                                label="被利用影响等级"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="evaRank2"
                                label="被利用影响"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="100">
                                <template>
                                    <el-button type="text" @click="detailDialogVisible2 = true">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-container>

                    <!--两个查看详情的对话框-->
                    <el-dialog title="管理脆弱性详情" :visible.sync="detailDialogVisible1">
                        <el-container style="display: flex;flex-direction: column;">
                            <h1 style="margin-left: 1vw;">组织管理脆弱性评估记录</h1>
                            <el-table
                                :data="manOrgAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                            <h1 style="margin-left: 1vw;">技术管理脆弱性评估记录</h1>
                            <el-table
                                :data="manTecAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                        </el-container>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="detailDialogVisible1=false">确定</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="技术脆弱性详情" :visible.sync="detailDialogVisible2">
                        <el-container style="display: flex;flex-direction: column;">
                            <h1 style="margin-left: 1vw;">应用系统脆弱性评估记录</h1>
                            <el-table
                                :data="tecAppAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                            <h1 style="margin-left: 1vw;">应用中间件脆弱性评估记录</h1>
                            <el-table
                                :data="tecMidAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                            <h1 style="margin-left: 1vw;">系统软件脆弱性评估记录</h1>
                            <el-table
                                :data="tecSysAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                            <h1 style="margin-left: 1vw;">网络结构脆弱性评估记录</h1>
                            <el-table
                                :data="tecWebAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                            <h1 style="margin-left: 1vw;">物理环境脆弱性评估记录</h1>
                            <el-table
                                :data="tecEnvAvg"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="名称"
                                    width="140">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank1"
                                    label="难易程度等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank1"
                                    label="难易程度"
                                    width="130">
                                </el-table-column>
                                <el-table-column
                                    prop="avgRank2"
                                    label="影响等级"
                                    width="150">
                                </el-table-column>
                                <el-table-column
                                    prop="evaRank2"
                                    label="影响"
                                    width="130">
                                </el-table-column>
                            </el-table>
                        </el-container>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="detailDialogVisible2 = false">确定</el-button>
                        </div>
                    </el-dialog>
                </el-main>
</el-dialog>
    </div>
</template>

<style>
.website-title {
    font-family: Microsoft Yahei;
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
}

.icon-set {
    margin-right: 0.5vw;
    margin-top: 0.5vh;
}
</style>