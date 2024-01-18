<template>
    <div class="home">
        <el-table :data="listTable" style="width: 100%">
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


        <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
            <el-main>

                <el-card>
                    <el-container>
                        <span>当前评估对象为：</span>
                        <span style="color: rgb(230, 100, 100);">{{ this.IdentifiedObject }}</span>
                    </el-container>
                </el-card>

                <el-container style="display: flex;flex-direction: column;">
                    <h1 style="margin-left: 1vw;">威胁评估记录</h1>
                    <el-table :data="threatAvg" style="width: 100%">
                        <el-table-column prop="name" label="名称" width="180">
                        </el-table-column>

                        <el-table-column prop="ThreatAbility" label="威胁能力" width="200">
                        </el-table-column>

                        <el-table-column prop="ThreatTime_value" label="威胁能力赋值" width="200">
                        </el-table-column>

                        <el-table-column prop="ThreatFrequecy" label="威胁频率" width="200">
                        </el-table-column>

                        <el-table-column prop="ThreatFrequecy_value" label="威胁频率赋值" width="200">
                        </el-table-column>

                        <el-table-column prop="ThreatTime" label="威胁时机" width="200">
                        </el-table-column>

                        <el-table-column prop="ThreatAbility_value" label="威胁时机赋值" width="200">
                        </el-table-column>

                        <el-table-column prop="final_value" label="最终赋值" width="200">
                        </el-table-column>



                    </el-table>
                </el-container>




            </el-main>
        </el-dialog>

    </div>
</template>





<script>
export default {
    name: 'ThreatEva',
    data() {
        return {
            //顶部导航栏
            activeIndex: '3',
            dialogVisible: false,
            listTable: [],
            //识别对象
            IdentifiedObject: '',
            manOrgAttribute: [],
            //评估数据
            threatAvg: [],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getList();
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
        getList() {
            this.listTable = JSON.parse(localStorage.getItem("ThreatIdentificationData"))
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
            const ThreatAbilityObj = this.manOrgAttribute.find(item => item.name === '威胁能力');
            const ThreatFrequecyObj = this.manOrgAttribute.find(item => item.name === '威胁频率');
            const ThreatTimeObj = this.manOrgAttribute.find(item => item.name === '威胁时机');
            let ThreatAbility = '暂无数据';
            let ThreatFrequecy = '暂无数据';
            let ThreatTime = '暂无数据';

            // console.log("aliibit");
            // console.log(this.manOrgAttribute[1].name);
            // console.log(ThreatFrequecyObj.rank);

            if(ThreatAbilityObj  !== undefined){
                ThreatAbility = ThreatAbilityObj.rank;
                console.log("ability");
                console.log(ThreatAbility);
            }

            if(ThreatFrequecyObj  !== undefined){
                ThreatFrequecy = ThreatFrequecyObj.rank;
                console.log(ThreatFrequecy);
            }

            if(ThreatTimeObj  !== undefined){
                ThreatTime = ThreatTimeObj.rank;
                console.log(ThreatTime);
            }

            this.threatAvg = [{
                'name': '威胁评估',
                'ThreatAbility': ThreatAbility,
                'ThreatFrequecy': ThreatFrequecy,
                'ThreatTime': ThreatTime,
                'ThreatAbility_value': this.GetAbilityValue(ThreatAbility),
                'ThreatFrequecy_value': this.GetFrequecyValue(ThreatFrequecy),
                'ThreatTime_value': this.GetTimeValue(ThreatTime),
                'final_value': ((this.GetAbilityValue(ThreatAbility) + this.GetFrequecyValue(ThreatFrequecy)
                    + this.GetTimeValue(ThreatTime)) / 3).toFixed(2),
            }]

        },
        GetAbilityValue(ThreatAbility) {
            if (ThreatAbility == '高') {
                return 3;
            }
            else if (ThreatAbility == '中') {
                return 2;
            }
            else if (ThreatAbility == '低') {
                return 1;
            }
            else {
                return 0;
            }

        },
        GetFrequecyValue(ThreatFrequecy) {
            if (ThreatFrequecy == '很高') {
                return 5;
            }
            else if (ThreatFrequecy == '高') {
                return 4;
            }
            else if (ThreatFrequecy == '中') {
                return 3;
            }
            else if (ThreatFrequecy == '低') {
                return 2;
            }
            else if (ThreatFrequecy == '很低') {
                return 1;
            }
            else {
                return 0;
            }
        },
        GetTimeValue(ThreatTime) {
            if (ThreatTime == '特殊时期') {
                return 3;
            }
            else if (ThreatTime == '普通时期') {
                return 2;
            }
            else if (ThreatTime == '自然规律') {
                return 1;
            }
            else {
                return 0;
            }

        },
    }

}
</script>